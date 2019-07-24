"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.ProgramListReducer = (state = { blocks: [], modules: [], isShowEdit: false, isShowProgramlist: false }, action) => {
    switch (action.type) {
        case ActionType_1.OPEN_PROGRAM_LIST: {
            return {
                isShowProgramlist: action.isShowProgramlist
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=ProgramListReducer.js.map