import { CLOSE_EDITBLOCK,
    OPEN_EDITBLOCK,
    ADD_BLOCK,
    DELETE_BLOCK,
    ADD_MODULE,
    DELETE_MODULE,
    OPEN_PROGRAM_LIST,
    HIDE_PROGRAM_LIST,
    OPEN_CREATE_PROJECT,
    HIDE_CREATE_PROJECT,
    CHANGE_PROJECT,
    SET_PAGE_LISTS,
} from './ActionType';

export const closeEditBlock = (isShowEdit) => {
    return {
        type: CLOSE_EDITBLOCK,
        isShowEdit: isShowEdit
    }
};

export const openEditBlock = (isShowEdit) => {
    return {
        type: OPEN_EDITBLOCK,
        isShowEdit: isShowEdit
    }
};

export const addBlock = (blocks) => {
    return {
        type: ADD_BLOCK,
        blocks: blocks
    }
};

export const deleteBlock = (blocks) => {
    return {
        type: DELETE_BLOCK,
        blocks: blocks
    }
};

export const addModules = (modules) => {
    return {
        type: ADD_MODULE,
        modules: modules
    }
};

export const deleteModules = (modules) => {
    return {
        type: DELETE_MODULE,
        modules: modules
    }
};

export const openProgramList = (isShowProgramlist) => {
    return {
        type: OPEN_PROGRAM_LIST,
        isShowProgramlist: isShowProgramlist
    }
};

export const hideProgramList = (isShowProgramlist) => {
    return {
        type: HIDE_PROGRAM_LIST,
        isShowProgramlist: isShowProgramlist
    }
};

export const openCreateProject = (isShowCreateProject) => {
    return {
        type: OPEN_CREATE_PROJECT,
        isShowCreateProject: isShowCreateProject
    }
};

export const hideCreateProject = (isShowCreateProject) => {
    return {
        type: HIDE_CREATE_PROJECT,
        isShowCreateProject: isShowCreateProject
    }
};

export const changeProject = (projectsInfo) => {
    return {
        type: CHANGE_PROJECT,
        projectsInfo: projectsInfo
    }
}

export const setPageLists = (pageLists) => {
    return {
        type: SET_PAGE_LISTS,
        pageLists: pageLists
    }
}