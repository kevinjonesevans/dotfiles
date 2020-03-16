"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const constants_1 = require("../constants");
const store_1 = require("../store");
class CodeTourNode extends vscode_1.TreeItem {
    constructor(tour, extensionPath, isRecording) {
        var _a;
        super(tour.title, isRecording
            ? vscode_1.TreeItemCollapsibleState.Expanded
            : vscode_1.TreeItemCollapsibleState.Collapsed);
        this.tour = tour;
        this.tooltip = tour.description;
        this.description = `${tour.steps.length} steps`;
        const contextValues = ["codetour.tour"];
        if (isRecording) {
            contextValues.push("recording");
        }
        const isActive = store_1.store.activeTour && tour.id === ((_a = store_1.store.activeTour) === null || _a === void 0 ? void 0 : _a.tour.id);
        if (isActive) {
            contextValues.push("active");
        }
        this.contextValue = contextValues.join(".");
        const icon = isRecording
            ? "tour-recording"
            : isActive
                ? "tour-active"
                : "tour";
        this.iconPath = {
            dark: path.join(extensionPath, `images/dark/${icon}.svg`),
            light: path.join(extensionPath, `images/light/${icon}.svg`)
        };
    }
}
exports.CodeTourNode = CodeTourNode;
const HEADING_PATTERN = /^#+\s*(.*)/;
function getStepLabel(tour, stepNumber) {
    const step = tour.steps[stepNumber];
    const prefix = `#${stepNumber + 1} - `;
    let label;
    if (step.title) {
        label = step.title;
    }
    else if (HEADING_PATTERN.test(step.description.trim())) {
        label = step.description.trim().match(HEADING_PATTERN)[1];
    }
    else {
        label = step.uri ? step.uri : step.file;
    }
    return `${prefix}${label}`;
}
class CodeTourStepNode extends vscode_1.TreeItem {
    constructor(tour, stepNumber) {
        super(getStepLabel(tour, stepNumber));
        this.tour = tour;
        this.stepNumber = stepNumber;
        const step = tour.steps[stepNumber];
        this.command = {
            command: `${constants_1.EXTENSION_NAME}.startTour`,
            title: "Start Tour",
            arguments: [tour, stepNumber]
        };
        this.resourceUri = step.uri
            ? vscode_1.Uri.parse(step.uri)
            : vscode_1.Uri.parse(path.join(vscode_1.workspace.workspaceFolders[0].uri.toString(), step.file));
        this.iconPath = vscode_1.ThemeIcon.File;
        const contextValues = ["codetour.tourStep"];
        if (stepNumber > 0) {
            contextValues.push("hasPrevious");
        }
        if (stepNumber < tour.steps.length - 1) {
            contextValues.push("hasNext");
        }
        this.contextValue = contextValues.join(".");
    }
}
exports.CodeTourStepNode = CodeTourStepNode;
class RecordTourNode extends vscode_1.TreeItem {
    constructor() {
        super("Record new tour...");
        this.command = {
            command: `${constants_1.EXTENSION_NAME}.recordTour`,
            title: "Record Tour"
        };
    }
}
exports.RecordTourNode = RecordTourNode;
//# sourceMappingURL=nodes.js.map