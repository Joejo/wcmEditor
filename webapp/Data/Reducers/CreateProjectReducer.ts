import {
    OPEN_CREATE_PROJECT
} from '../Actions/ActionType';

export const CreateProjectReducer = (state = { blocks: [], modules: [], isShowEdit: false, isShowProgramlist:false, isShowCreateProject:false}, action) => {
    switch(action.type){
        case OPEN_CREATE_PROJECT: {
            return {
                isShowCreateProject: action.isShowCreateProject
            }
        }
        default: {
            return state
        }
    }
}