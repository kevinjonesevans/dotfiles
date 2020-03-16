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
const commands_1 = require("./commands");
const constants_1 = require("./constants");
const status_1 = require("./status");
const store_1 = require("./store");
const provider_1 = require("./store/provider");
const tree_1 = require("./tree");
const git_1 = require("./git");
const actions_1 = require("./store/actions");
function promptForTour(workspaceRoot, globalState) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `${constants_1.EXTENSION_NAME}:${workspaceRoot}`;
        if (store_1.store.hasTours && !globalState.get(key)) {
            globalState.update(key, true);
            if (yield vscode.window.showInformationMessage("This workspace has guided tours you can take to get familiar with the codebase.", "Start CodeTour")) {
                vscode.commands.executeCommand(`${constants_1.EXTENSION_NAME}.startTour`);
            }
        }
    });
}
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (vscode.workspace.workspaceFolders) {
            const workspaceRoot = vscode.workspace.workspaceFolders[0].uri.toString();
            yield provider_1.discoverTours(workspaceRoot);
            commands_1.registerCommands();
            tree_1.registerTreeProvider(context.extensionPath);
            status_1.registerStatusBar();
            promptForTour(workspaceRoot, context.globalState);
            git_1.initializeGitApi();
        }
        return {
            startTour: actions_1.startCodeTour,
            endCurrentTour: actions_1.endCurrentCodeTour
        };
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map