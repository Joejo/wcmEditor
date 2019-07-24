import {
    ADD_BLOCK,
    DELETE_BLOCK
} from '../Actions/ActionType';

interface stateInterface {
    blocks: any
}

export const BlockReducer = (state = { blocks: [], modules: [], isShowEdit: false }, action) => {
    switch(action.type){
        case ADD_BLOCK: {
            state.blocks.push(action.blocks);
            return {
                blocks: state.blocks
            }
        }
        case DELETE_BLOCK: {
            state.blocks.splice(action.blocks, 1)
            return {
                blocks: state.blocks
            }
        }
        default: {
            return state
        }
    }
}