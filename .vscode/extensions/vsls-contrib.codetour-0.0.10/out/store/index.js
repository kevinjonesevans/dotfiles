"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
exports.PENDING_TOUR_ID = "@@RECORDING";
exports.store = mobx_1.observable({
    tours: [],
    activeTour: null,
    isRecording: false,
    get hasTours() {
        return this.tours.length > 0;
    }
});
//# sourceMappingURL=index.js.map