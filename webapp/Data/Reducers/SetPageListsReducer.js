"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("../Actions/ActionType");
exports.SetPageListsReducer = (state = { blocks: [], modules: [], isShowEdit: false, projectsInfo: {}, pageLists: {} }, action) => {
    switch (action.type) {
        case ActionType_1.SET_PAGE_LISTS: {
            return {
                pageLists: action.pageLists
            };
        }
        default: {
            return state;
        }
    }
};
//# sourceMappingURL=SetPageListsReducer.js.map