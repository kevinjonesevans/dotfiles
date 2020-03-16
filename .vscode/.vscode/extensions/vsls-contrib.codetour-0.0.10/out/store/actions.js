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
const vscode_1 = require("vscode");
const _1 = require(".");
const constants_1 = require("../constants");
const mobx_1 = require("mobx");
const git_1 = require("../git");
const IN_TOUR_KEY = `${constants_1.EXTENSION_NAME}:inTour`;
const CONTROLLER_ID = "codetour";
const CONTROLLER_LABEL = "CodeTour";
const CONTROLLER_ICON = vscode_1.Uri.parse("https://cdn.jsdelivr.net/gh/vsls-contrib/code-tour/images/icon.png");
let id = 0;
class CodeTourComment {
    constructor(body, label = "", parent) {
        this.body = body;
        this.label = label;
        this.parent = parent;
        this.id = (++id).toString();
        this.contextValue = "";
        this.mode = vscode_1.CommentMode.Preview;
        this.author = {
            name: CONTROLLER_LABEL,
            iconPath: CONTROLLER_ICON
        };
    }
}
exports.CodeTourComment = CodeTourComment;
let controller;
function showDocument(uri, range, selection) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = vscode_1.window.visibleTextEditors.find(editor => editor.document.uri.toString() === uri.toString()) || (yield vscode_1.window.showTextDocument(uri, { preserveFocus: false }));
        if (selection) {
            document.selection = selection;
        }
        document.revealRange(range, vscode_1.TextEditorRevealType.InCenter);
    });
}
function renderCurrentStep() {
    return __awaiter(this, void 0, void 0, function* () {
        if (_1.store.activeTour.thread) {
            _1.store.activeTour.thread.dispose();
        }
        const currentTour = _1.store.activeTour.tour;
        const currentStep = _1.store.activeTour.step;
        const step = currentTour.steps[currentStep];
        if (!step) {
            return;
        }
        // Adjust the line number, to allow the user to specify
        // them in 1-based format, not 0-based
        const line = step.line - 1;
        const range = new vscode_1.Range(line, 0, line, 0);
        let label = `Step #${currentStep + 1} of ${currentTour.steps.length}`;
        if (currentTour.title) {
            label += ` (${currentTour.title})`;
        }
        const workspaceRoot = _1.store.activeTour.workspaceRoot
            ? _1.store.activeTour.workspaceRoot
            : vscode_1.workspace.workspaceFolders
                ? vscode_1.workspace.workspaceFolders[0].uri.toString()
                : "";
        let uri = step.uri
            ? vscode_1.Uri.parse(step.uri)
            : vscode_1.Uri.parse(`${workspaceRoot}/${step.file}`);
        if (currentTour.ref && currentTour.ref !== "HEAD") {
            const repo = git_1.api.getRepository(uri);
            if (repo &&
                repo.state.HEAD &&
                repo.state.HEAD.name !== currentTour.ref &&
                repo.state.HEAD.commit !== currentTour.ref) {
                uri = yield git_1.api.toGitUri(uri, currentTour.ref);
            }
        }
        _1.store.activeTour.thread = controller.createCommentThread(uri, range, []);
        _1.store.activeTour.thread.comments = [
            new CodeTourComment(step.description, label, _1.store.activeTour.thread)
        ];
        const contextValues = [];
        if (currentStep > 0) {
            contextValues.push("hasPrevious");
        }
        if (currentStep < currentTour.steps.length - 1) {
            contextValues.push("hasNext");
        }
        _1.store.activeTour.thread.contextValue = contextValues.join(".");
        _1.store.activeTour.thread.collapsibleState =
            vscode_1.CommentThreadCollapsibleState.Expanded;
        let selection;
        if (step.selection) {
            // Adjust the 1-based positions
            // to the 0-based positions that
            // VS Code's editor uses.
            selection = new vscode_1.Selection(step.selection.start.line - 1, step.selection.start.character - 1, step.selection.end.line - 1, step.selection.end.character - 1);
        }
        else {
            selection = new vscode_1.Selection(range.start, range.end);
        }
        showDocument(uri, range, selection);
    });
}
function startCodeTour(tour, stepNumber, workspaceRoot, startInEditMode = false) {
    if (controller) {
        controller.dispose();
    }
    controller = vscode_1.comments.createCommentController(CONTROLLER_ID, CONTROLLER_LABEL);
    // TODO: Correctly limit the commenting ranges
    // to files within the workspace root
    controller.commentingRangeProvider = {
        provideCommentingRanges: (document) => {
            if (_1.store.isRecording) {
                return [new vscode_1.Range(0, 0, document.lineCount, 0)];
            }
            else {
                return null;
            }
        }
    };
    _1.store.activeTour = {
        tour,
        step: stepNumber ? stepNumber : tour.steps.length ? 0 : -1,
        workspaceRoot,
        thread: null
    };
    vscode_1.commands.executeCommand("setContext", IN_TOUR_KEY, true);
    if (startInEditMode) {
        _1.store.isRecording = true;
        vscode_1.commands.executeCommand("setContext", "codetour:recording", true);
    }
}
exports.startCodeTour = startCodeTour;
function endCurrentCodeTour() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (_1.store.isRecording) {
            _1.store.isRecording = false;
            vscode_1.commands.executeCommand("setContext", "codetour:recording", false);
        }
        if ((_a = _1.store.activeTour) === null || _a === void 0 ? void 0 : _a.thread) {
            _1.store.activeTour.thread.dispose();
            _1.store.activeTour.thread = null;
        }
        if (controller) {
            controller.dispose();
        }
        _1.store.activeTour = null;
        vscode_1.commands.executeCommand("setContext", IN_TOUR_KEY, false);
    });
}
exports.endCurrentCodeTour = endCurrentCodeTour;
function moveCurrentCodeTourBackward() {
    --_1.store.activeTour.step;
}
exports.moveCurrentCodeTourBackward = moveCurrentCodeTourBackward;
function moveCurrentCodeTourForward() {
    _1.store.activeTour.step++;
}
exports.moveCurrentCodeTourForward = moveCurrentCodeTourForward;
function resumeCurrentCodeTour() {
    showDocument(_1.store.activeTour.thread.uri, _1.store.activeTour.thread.range);
}
exports.resumeCurrentCodeTour = resumeCurrentCodeTour;
mobx_1.reaction(() => [
    _1.store.activeTour
        ? [
            _1.store.activeTour.step,
            _1.store.activeTour.tour.title,
            _1.store.activeTour.tour.steps.map(step => [
                step.title,
                step.description,
                step.line
            ])
        ]
        : null
], () => {
    if (_1.store.activeTour) {
        renderCurrentStep();
    }
});
//# sourceMappingURL=actions.js.map