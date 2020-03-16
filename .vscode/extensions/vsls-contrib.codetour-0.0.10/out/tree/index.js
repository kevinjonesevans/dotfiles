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
const mobx_1 = require("mobx");
const vscode_1 = require("vscode");
const store_1 = require("../store");
const nodes_1 = require("./nodes");
class CodeTourTreeProvider {
    constructor(extensionPath) {
        this.extensionPath = extensionPath;
        this._disposables = [];
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this
            ._onDidChangeTreeData.event;
        this.getTreeItem = (node) => node;
        mobx_1.reaction(() => [
            store_1.store.tours,
            store_1.store.hasTours,
            store_1.store.isRecording,
            store_1.store.activeTour
                ? [
                    store_1.store.activeTour.tour.title,
                    store_1.store.activeTour.tour.description,
                    store_1.store.activeTour.tour.steps.map(step => [
                        step.title,
                        step.description
                    ])
                ]
                : null
        ], () => {
            this._onDidChangeTreeData.fire();
        });
    }
    getChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!element) {
                if (!store_1.store.hasTours) {
                    return [new nodes_1.RecordTourNode()];
                }
                else {
                    const tours = store_1.store.tours.map(tour => {
                        const isRecording = store_1.store.isRecording &&
                            store_1.store.activeTour &&
                            store_1.store.activeTour.tour.id === tour.id;
                        return new nodes_1.CodeTourNode(tour, this.extensionPath, isRecording);
                    });
                    // Add the currently recording, in-memory tour to the tree
                    if (store_1.store.isRecording &&
                        store_1.store.activeTour &&
                        !tours.find(tour => tour.tour.title === store_1.store.activeTour.tour.title)) {
                        tours.unshift(new nodes_1.CodeTourNode(store_1.store.activeTour.tour, this.extensionPath, true));
                    }
                    return tours;
                }
            }
            else if (element instanceof nodes_1.CodeTourNode) {
                if (element.tour.steps.length === 0) {
                    return [new vscode_1.TreeItem("No steps recorded yet")];
                }
                else {
                    return element.tour.steps.map((_, index) => new nodes_1.CodeTourStepNode(element.tour, index));
                }
            }
        });
    }
    dispose() {
        this._disposables.forEach(disposable => disposable.dispose());
    }
}
function registerTreeProvider(extensionPath) {
    vscode_1.window.registerTreeDataProvider("codetour.tours", new CodeTourTreeProvider(extensionPath));
}
exports.registerTreeProvider = registerTreeProvider;
//# sourceMappingURL=index.js.map