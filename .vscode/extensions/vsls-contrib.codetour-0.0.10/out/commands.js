"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const constants_1 = require("./constants");
const store_1 = require("./store");
const actions_1 = require("./store/actions");
const provider_1 = require("./store/provider");
const nodes_1 = require("./tree/nodes");
const mobx_1 = require("mobx");
const git_1 = require("./git");
const path = require("path");
function registerCommands() {
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.startTour`, (tour, stepNumber) => __awaiter(this, void 0, void 0, function* () {
        if (tour) {
            const targetTour = tour instanceof nodes_1.CodeTourNode ? tour.tour : tour;
            return actions_1.startCodeTour(targetTour, stepNumber);
        }
        let items = store_1.store.tours.map(tour => ({
            label: tour.title,
            tour: tour,
            detail: tour.description
        }));
        if (items.length === 1) {
            return actions_1.startCodeTour(items[0].tour);
        }
        const response = yield vscode.window.showQuickPick(items, {
            placeHolder: "Select the tour to start..."
        });
        if (response) {
            actions_1.startCodeTour(response.tour);
        }
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.endTour`, actions_1.endCurrentCodeTour);
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.previousTourStep`, actions_1.moveCurrentCodeTourBackward);
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.nextTourStep`, actions_1.moveCurrentCodeTourForward);
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.refreshTours`, () => __awaiter(this, void 0, void 0, function* () {
        if (vscode.workspace.workspaceFolders) {
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.toString();
            yield provider_1.discoverTours(workspaceRoot);
        }
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.resumeTour`, actions_1.resumeCurrentCodeTour);
    function writeTourFile(title, ref) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = title
                .toLocaleLowerCase()
                .replace(/\s/g, "-")
                .replace(/[^\w\d-_]/g, "");
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.toString();
            const uri = vscode.Uri.parse(`${workspaceRoot}/.vscode/tours/${file}.json`);
            const tour = { title, steps: [] };
            if (ref && ref !== "HEAD") {
                tour.ref = ref;
            }
            const tourContent = JSON.stringify(tour, null, 2);
            yield vscode.workspace.fs.writeFile(uri, new Buffer(tourContent));
            tour.id = uri.toString();
            // @ts-ignore
            return tour;
        });
    }
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.recordTour`, () => __awaiter(this, void 0, void 0, function* () {
        const title = yield vscode.window.showInputBox({
            prompt: "Specify the title of the tour"
        });
        if (!title) {
            return;
        }
        const ref = yield promptForTourRef();
        const tour = yield writeTourFile(title, ref);
        actions_1.startCodeTour(tour);
        store_1.store.isRecording = true;
        yield vscode.commands.executeCommand("setContext", "codetour:recording", true);
        if (yield vscode.window.showInformationMessage("Code tour recording started. Start creating steps by clicking the + button to the left of each line of code.", "Cancel")) {
            const uri = vscode.Uri.parse(tour.id);
            vscode.workspace.fs.delete(uri);
            actions_1.endCurrentCodeTour();
            store_1.store.isRecording = false;
            vscode.commands.executeCommand("setContext", "codetour:recording", false);
        }
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.addTourStep`, (reply) => {
        if (store_1.store.activeTour.thread) {
            store_1.store.activeTour.thread.dispose();
        }
        mobx_1.runInAction(() => {
            store_1.store.activeTour.thread = reply.thread;
            store_1.store.activeTour.step++;
            const tour = store_1.store.activeTour.tour;
            const thread = store_1.store.activeTour.thread;
            const stepNumber = store_1.store.activeTour.step;
            const file = store_1.store.activeTour.workspaceRoot
                ? path.relative(store_1.store.activeTour.workspaceRoot.toString(), thread.uri.toString())
                : vscode.workspace.asRelativePath(thread.uri);
            const step = {
                file,
                line: thread.range.start.line + 1,
                description: reply.text
            };
            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor &&
                activeEditor.selection &&
                !activeEditor.selection.isEmpty) {
                const { start, end } = activeEditor.selection;
                // Convert the selection from 0-based
                // to 1-based to make it easier to
                // edit the JSON tour file by hand.
                const selection = {
                    start: {
                        line: start.line + 1,
                        character: start.character + 1
                    },
                    end: {
                        line: end.line + 1,
                        character: end.character + 1
                    }
                };
                const previousStep = store_1.store.activeTour.tour.steps[store_1.store.activeTour.step - 1];
                // Check whether the end-user forgot to "reset"
                // the selection from the previous step, and if so,
                // ignore it from this step since it's not likely useful.
                if (!previousStep ||
                    !previousStep.selection ||
                    !mobx_1.comparer.structural(previousStep.selection, selection)) {
                    step.selection = selection;
                }
            }
            tour.steps.splice(stepNumber, 0, step);
            saveTour(tour);
            let label = `Step #${stepNumber + 1} of ${tour.steps.length}`;
            const contextValues = [];
            if (tour.steps.length > 1) {
                contextValues.push("hasPrevious");
            }
            if (stepNumber < tour.steps.length - 1) {
                contextValues.push("hasNext");
            }
            thread.contextValue = contextValues.join(".");
            thread.comments = [new actions_1.CodeTourComment(reply.text, label, thread)];
        });
    });
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.editTour`, (node) => __awaiter(this, void 0, void 0, function* () {
        store_1.store.isRecording = true;
        yield vscode.commands.executeCommand("setContext", "codetour:recording", true);
        if (node instanceof nodes_1.CodeTourNode) {
            actions_1.startCodeTour(node.tour);
        }
        else if (store_1.store.activeTour) {
            // We need to re-start the tour so that the associated
            // comment controller is put into edit mode
            actions_1.startCodeTour(store_1.store.activeTour.tour, store_1.store.activeTour.step, store_1.store.activeTour.workspaceRoot);
        }
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.editTourStep`, (comment) => __awaiter(this, void 0, void 0, function* () {
        comment.parent.comments = comment.parent.comments.map(comment => {
            comment.mode = vscode.CommentMode.Editing;
            return comment;
        });
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.saveTourStep`, (comment) => __awaiter(this, void 0, void 0, function* () {
        if (!comment.parent) {
            return;
        }
        const content = comment.body instanceof vscode.MarkdownString
            ? comment.body.value
            : comment.body;
        store_1.store.activeTour.tour.steps[store_1.store.activeTour.step].description = content;
        saveTour(store_1.store.activeTour.tour);
        comment.parent.comments = comment.parent.comments.map(cmt => {
            if (cmt.id === comment.id) {
                cmt.mode = vscode.CommentMode.Preview;
            }
            return cmt;
        });
    }));
    function saveTour(tour) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = vscode.Uri.parse(tour.id);
            const newTour = Object.assign({}, tour);
            delete newTour.id;
            const tourContent = JSON.stringify(newTour, null, 2);
            return vscode.workspace.fs.writeFile(uri, new Buffer(tourContent));
        });
    }
    function updateTourProperty(tour, property) {
        return __awaiter(this, void 0, void 0, function* () {
            const propertyValue = yield vscode.window.showInputBox({
                prompt: `Enter the ${property} for this tour`,
                // @ts-ignore
                value: tour[property]
            });
            if (!propertyValue) {
                return;
            }
            // @ts-ignore
            tour[property] = propertyValue;
            saveTour(tour);
        });
    }
    function moveStep(movement, node) {
        let tour, stepNumber;
        if (node instanceof actions_1.CodeTourComment) {
            tour = store_1.store.activeTour.tour;
            stepNumber = store_1.store.activeTour.step;
        }
        else {
            tour = node.tour;
            stepNumber = node.stepNumber;
        }
        const step = tour.steps[stepNumber];
        tour.steps.splice(stepNumber, 1);
        tour.steps.splice(stepNumber + movement, 0, step);
        // If the user is moving the currently active step, then move
        // the tour play along with it as well.
        if (store_1.store.activeTour &&
            tour.id === store_1.store.activeTour.tour.id &&
            stepNumber === store_1.store.activeTour.step) {
            store_1.store.activeTour.step += movement;
        }
        saveTour(tour);
    }
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.moveTourStepBack`, moveStep.bind(null, -1));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.moveTourStepForward`, moveStep.bind(null, 1));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.changeTourDescription`, (node) => updateTourProperty(node.tour, "description"));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.changeTourTitle`, (node) => updateTourProperty(node.tour, "title"));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.changeTourRef`, (node) => __awaiter(this, void 0, void 0, function* () {
        const ref = yield promptForTourRef();
        if (ref) {
            if (ref === "HEAD") {
                delete node.tour.ref;
            }
            else {
                node.tour.ref = ref;
            }
        }
        saveTour(node.tour);
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.deleteTour`, (node) => __awaiter(this, void 0, void 0, function* () {
        if (yield vscode.window.showInformationMessage(`Are you sure your want to delete the "${node.tour.title}" tour?`, "Delete Tour")) {
            if (store_1.store.activeTour &&
                node.tour.title === store_1.store.activeTour.tour.title) {
                yield actions_1.endCurrentCodeTour();
            }
            if (node.tour.id) {
                const uri = vscode.Uri.parse(node.tour.id);
                vscode.workspace.fs.delete(uri);
            }
        }
    }));
    vscode.commands.registerCommand(`${constants_1.EXTENSION_NAME}.deleteTourStep`, (node) => __awaiter(this, void 0, void 0, function* () {
        if (yield vscode.window.showInformationMessage(`Are you sure your want to delete this step?`, "Delete Step")) {
            let tour, step;
            if (node instanceof nodes_1.CodeTourStepNode) {
                tour = node.tour;
                step = node.stepNumber;
            }
            else {
                tour = store_1.store.activeTour.tour;
                step = store_1.store.activeTour.step;
                node.parent.dispose();
            }
            tour.steps.splice(step, 1);
            if (store_1.store.activeTour && store_1.store.activeTour.tour.id === tour.id) {
                if (step <= store_1.store.activeTour.step &&
                    (store_1.store.activeTour.step > 0 || tour.steps.length === 0)) {
                    store_1.store.activeTour.step--;
                }
            }
            saveTour(tour);
        }
    }));
    function promptForTourRef() {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = vscode.workspace.workspaceFolders[0].uri;
            const repository = git_1.api.getRepository(uri);
            if (!repository) {
                return;
            }
            const currentBranch = repository.state.HEAD.name;
            let items = [
                {
                    label: "$(circle-slash) None",
                    description: "Allow the tour to apply to all versions of this repository",
                    ref: "HEAD",
                    alwaysShow: true
                },
                {
                    label: `$(git-branch) Current branch (${currentBranch})`,
                    description: "Allow the tour to apply to all versions of this branch",
                    ref: currentBranch,
                    alwaysShow: true
                },
                {
                    label: "$(git-commit) Current commit",
                    description: "Keep the tour associated with a specific commit",
                    ref: repository.state.HEAD ? repository.state.HEAD.commit : "",
                    alwaysShow: true
                }
            ];
            const tags = repository.state.refs
                .filter(ref => ref.type === 2 /* Tag */)
                .map(ref => ref.name)
                .sort()
                .map(ref => ({
                label: `$(tag) ${ref}`,
                description: "Keep the tour associated with a specific tag",
                ref
            }));
            if (tags) {
                items.push(...tags);
            }
            const response = yield vscode.window.showQuickPick(items, {
                placeHolder: "Select the Git ref to associate the tour with:"
            });
            if (response) {
                return response.ref;
            }
        });
    }
}
exports.registerCommands = registerCommands;
//# sourceMappingURL=commands.js.map