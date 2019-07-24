import {
    CLOSE_EDITBLOCK,
    OPEN_EDITBLOCK,
} from '../Actions/ActionType';

export const EditBlockReducer = (state = { blocks: [], isShowEdit: false }, action) => {
    switch(action.type){
        case CLOSE_EDITBLOCK: {
            return {
                isShowEdit: action.isShowEdit
            }
        }
        case OPEN_EDITBLOCK: {
            return {
                isShowEdit: action.isShowEdit
            }
        }
        default: {
            return state
        }
    }
}