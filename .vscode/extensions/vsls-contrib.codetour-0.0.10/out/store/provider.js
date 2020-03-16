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
const _1 = require(".");
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const mobx_1 = require("mobx");
const mobx_2 = require("mobx");
const MAIN_TOUR_FILES = [
    `${constants_1.EXTENSION_NAME}.json`,
    "tour.json",
    `${constants_1.VSCODE_DIRECTORY}/${constants_1.EXTENSION_NAME}.json`,
    `${constants_1.VSCODE_DIRECTORY}/tour.json`
];
const SUB_TOUR_DIRECTORY = `${constants_1.VSCODE_DIRECTORY}/tours`;
const HAS_TOURS_KEY = `${constants_1.EXTENSION_NAME}:hasTours`;
function discoverTours(workspaceRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const mainTour = yield discoverMainTour(workspaceRoot);
        const tours = yield discoverSubTours(workspaceRoot);
        if (mainTour) {
            tours.push(mainTour);
        }
        _1.store.tours = tours.sort((a, b) => a.title.localeCompare(b.title));
        if (_1.store.activeTour) {
            const tour = tours.find(tour => tour.id === _1.store.activeTour.tour.id);
            if (tour) {
                if (!mobx_2.comparer.structural(_1.store.activeTour.tour, tour)) {
                    // Since the active tour could be already observed,
                    // we want to update it in place with the new properties.
                    mobx_1.set(_1.store.activeTour.tour, tour);
                }
            }
            else {
                // The user deleted the tour
                // file that's associated with
                // the active tour
                actions_1.endCurrentCodeTour();
            }
        }
        vscode.commands.executeCommand("setContext", HAS_TOURS_KEY, _1.store.hasTours);
    });
}
exports.discoverTours = discoverTours;
function discoverMainTour(workspaceRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const tourFile of MAIN_TOUR_FILES) {
            try {
                const uri = vscode.Uri.parse(`${workspaceRoot}/${tourFile}`);
                const mainTourContent = (yield vscode.workspace.fs.readFile(uri)).toString();
                const tour = JSON.parse(mainTourContent);
                tour.id = uri.toString();
                return tour;
            }
            catch (_a) { }
        }
        return null;
    });
}
function discoverSubTours(workspaceRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tourDirectory = `${workspaceRoot}/${SUB_TOUR_DIRECTORY}`;
            const uri = vscode.Uri.parse(tourDirectory);
            const tourFiles = yield vscode.workspace.fs.readDirectory(uri);
            return Promise.all(tourFiles
                .filter(([, type]) => type === vscode.FileType.File)
                .map(([file]) => __awaiter(this, void 0, void 0, function* () {
                const tourUri = vscode.Uri.parse(`${tourDirectory}/${file}`);
                const tourContent = (yield vscode.workspace.fs.readFile(tourUri)).toString();
                const tour = JSON.parse(tourContent);
                tour.id = tourUri.toString();
                return tour;
            })));
        }
        catch (_a) {
            return [];
        }
    });
}
const watcher = vscode.workspace.createFileSystemWatcher("**/.vscode/tours/*.json");
function updateTours() {
    const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.toString();
    discoverTours(workspaceRoot);
}
watcher.onDidChange(updateTours);
watcher.onDidCreate(updateTours);
watcher.onDidDelete(updateTours);
//# sourceMappingURL=provider.js.map