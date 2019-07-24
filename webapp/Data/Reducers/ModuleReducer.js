"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.ModuleReducer = (state = { blocks: [], modules: [], isShowEdit: false }, action) => {
    switch (action.type) {
        case ActionType_1.ADD_MODULE: {
            Object.assign(state.modules, action.modules);
            return {
                modules: state.modules
            };
        }
        case ActionType_1.DELETE_MODULE: {
            console.log(state, action);
            if (state.modules && state.modules.length > 0) {
                state.modules.splice(action.modules, 1);
            }
            return {
                modules: state.modules
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=ModuleReducer.js.map