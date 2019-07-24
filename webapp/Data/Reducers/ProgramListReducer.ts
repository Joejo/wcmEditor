import {
    OPEN_PROGRAM_LIST
} from '../Actions/ActionType';

export const ProgramListReducer = (state = { blocks: [], modules: [], isShowEdit: false, isShowProgramlist:false}, action) => {
    switch(action.type){
        case OPEN_PROGRAM_LIST: {
            return {
                isShowProgramlist: action.isShowProgramlist
            }
        }
        default: {
            return state
        }
    }
}