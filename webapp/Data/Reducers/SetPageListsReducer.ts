import {
    SET_PAGE_LISTS
} from '../Actions/ActionType';

export const SetPageListsReducer = (state = { blocks: [], modules: [], isShowEdit: false, projectsInfo: {}, pageLists: {} }, action) => {
    switch (action.type){
        case SET_PAGE_LISTS: {
            return {
                pageLists: action.pageLists
            }
        }
        default: {
            return state;
        }
    }
}