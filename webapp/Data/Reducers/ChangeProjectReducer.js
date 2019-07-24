"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.ChangeProjectReducer = (state = { blocks: [], modules: [], isShowEdit: false, projectsInfo: {} }, action) => {
    switch (action.type) {
        case ActionType_1.CHANGE_PROJECT:
            {
                return {
                    projectsInfo: action.projectsInfo
                };
            }
            ;
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=ChangeProjectReducer.js.map