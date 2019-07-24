import {
    ADD_MODULE,
    DELETE_MODULE
} from '../Actions/ActionType';

interface stateInterface {
    blocks: any
}

export const ModuleReducer = (state = { blocks: [], modules: [], isShowEdit: false }, action) => {
    switch(action.type){
        case ADD_MODULE: {
            Object.assign(state.modules, action.modules);
            return {
                modules: state.modules
            }
        }
        case DELETE_MODULE: {

            console.log(state, action);
            if(state.modules && state.modules.length > 0){
                state.modules.splice(action.modules, 1)
            }
            return {
                modules: state.modules
            }
        }
        default: {
            return state
        }
    }
}