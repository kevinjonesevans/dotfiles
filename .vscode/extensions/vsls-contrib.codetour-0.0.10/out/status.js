"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const store_1 = require("./store");
const constants_1 = require("./constants");
const mobx_1 = require("mobx");
function createCurrentTourItem() {
    const currentTourItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    currentTourItem.command = `${constants_1.EXTENSION_NAME}.resumeTour`;
    currentTourItem.color = new vscode.ThemeColor("statusBarItem.prominentForeground");
    currentTourItem.show();
    return currentTourItem;
}
function createStartTourItem() {
    const startTourItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    startTourItem.text = "$(play) Start CodeTour";
    startTourItem.command = `${constants_1.EXTENSION_NAME}.startTour`;
    startTourItem.show();
    return startTourItem;
}
let currentTourItem = null;
let startTourItem = null;
function registerStatusBar() {
    if (store_1.store.hasTours) {
        startTourItem = createStartTourItem();
    }
    mobx_1.reaction(
    // @ts-ignore
    () => [
        store_1.store.activeTour
            ? [
                store_1.store.activeTour.step,
                store_1.store.activeTour.tour.title,
                store_1.store.activeTour.tour.steps.length
            ]
            : null,
        store_1.store.isRecording
    ], () => {
        if (store_1.store.activeTour) {
            if (!currentTourItem) {
                currentTourItem = createCurrentTourItem();
            }
            const prefix = store_1.store.isRecording ? "Recording " : "";
            currentTourItem.text = `${prefix}CodeTour: #${store_1.store.activeTour.step +
                1} of ${store_1.store.activeTour.tour.steps.length} (${store_1.store.activeTour.tour.title})`;
            if (store_1.store.activeTour.step === 0 && startTourItem) {
                startTourItem.hide();
            }
        }
        else {
            if (currentTourItem) {
                currentTourItem.dispose();
                currentTourItem = null;
            }
            if (startTourItem) {
                startTourItem.show();
            }
        }
    });
}
exports.registerStatusBar = registerStatusBar;
//# sourceMappingURL=status.js.map