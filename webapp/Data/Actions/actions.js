"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActionType_1 = require("./ActionType");
exports.closeEditBlock = (isShowEdit) => {
    return {
        type: ActionType_1.CLOSE_EDITBLOCK,
        isShowEdit: isShowEdit
    };
};
exports.openEditBlock = (isShowEdit) => {
    return {
        type: ActionType_1.OPEN_EDITBLOCK,
        isShowEdit: isShowEdit
    };
};
exports.addBlock = (blocks) => {
    return {
        type: ActionType_1.ADD_BLOCK,
        blocks: blocks
    };
};
exports.deleteBlock = (blocks) => {
    return {
        type: ActionType_1.DELETE_BLOCK,
        blocks: blocks
    };
};
exports.addModules = (modules) => {
    return {
        type: ActionType_1.ADD_MODULE,
        modules: modules
    };
};
exports.deleteModules = (modules) => {
    return {
        type: ActionType_1.DELETE_MODULE,
        modules: modules
    };
};
exports.openProgramList = (isShowProgramlist) => {
    return {
        type: ActionType_1.OPEN_PROGRAM_LIST,
        isShowProgramlist: isShowProgramlist
    };
};
exports.hideProgramList = (isShowProgramlist) => {
    return {
        type: ActionType_1.HIDE_PROGRAM_LIST,
        isShowProgramlist: isShowProgramlist
    };
};
exports.openCreateProject = (isShowCreateProject) => {
    return {
        type: ActionType_1.OPEN_CREATE_PROJECT,
        isShowCreateProject: isShowCreateProject
    };
};
exports.hideCreateProject = (isShowCreateProject) => {
    return {
        type: ActionType_1.HIDE_CREATE_PROJECT,
        isShowCreateProject: isShowCreateProject
    };
};
exports.changeProject = (projectsInfo) => {
    return {
        type: ActionType_1.CHANGE_PROJECT,
        projectsInfo: projectsInfo
    };
};
exports.setPageLists = (pageLists) => {
    return {
        type: ActionType_1.SET_PAGE_LISTS,
        pageLists: pageLists
    };
};
//# sourceMappingURL=actions.js.map