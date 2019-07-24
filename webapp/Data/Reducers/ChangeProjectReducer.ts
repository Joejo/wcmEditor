import {
    CHANGE_PROJECT
} from '../Actions/ActionType';

export const ChangeProjectReducer = (state = { blocks: [], modules: [], isShowEdit: false, projectsInfo: {} }, action) => {
    switch (action.type){
        case CHANGE_PROJECT: {
            return {
                projectsInfo: action.projectsInfo
            }
        };
        default: {
            return state
        }
    }
}