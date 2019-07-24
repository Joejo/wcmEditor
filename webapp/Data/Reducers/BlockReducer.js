"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.BlockReducer = (state = { blocks: [], modules: [], isShowEdit: false }, action) => {
    switch (action.type) {
        case ActionType_1.ADD_BLOCK: {
            state.blocks.push(action.blocks);
            return {
                blocks: state.blocks
            };
        }
        case ActionType_1.DELETE_BLOCK: {
            state.blocks.splice(action.blocks, 1);
            return {
                blocks: state.blocks
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=BlockReducer.js.map