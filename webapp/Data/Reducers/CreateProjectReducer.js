"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.CreateProjectReducer = (state = { blocks: [], modules: [], isShowEdit: false, isShowProgramlist: false, isShowCreateProject: false }, action) => {
    switch (action.type) {
        case ActionType_1.OPEN_CREATE_PROJECT: {
            return {
                isShowCreateProject: action.isShowCreateProject
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=CreateProjectReducer.js.map