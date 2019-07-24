"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.EditBlockReducer = (state = { blocks: [], isShowEdit: false }, action) => {
    switch (action.type) {
        case ActionType_1.CLOSE_EDITBLOCK: {
            return {
                isShowEdit: action.isShowEdit
            };
        }
        case ActionType_1.OPEN_EDITBLOCK: {
            return {
                isShowEdit: action.isShowEdit
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=EditBlockReducer.js.map