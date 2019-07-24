import { createStore, combineReducers } from 'redux';
import { EditBlockReducer as EditBlockState} from '../Reducers/EditBlockReducer';
import { BlockReducer as BlockState} from '../Reducers/BlockReducer';
import { ModuleReducer as ModuleState} from '../Reducers/ModuleReducer';
import { ProgramListReducer as ProgramListState} from '../Reducers/ProgramListReducer';
import { CreateProjectReducer as CreateProjectState} from '../Reducers/CreateProjectReducer';
import { ChangeProjectReducer as ChangeProjectState} from '../Reducers/ChangeProjectReducer';
import { SetPageListsReducer as SetPageListsState} from '../Reducers/SetPageListsReducer';
import { storage } from '../../Utils';
const { recordsStorage = {dataStore: {}} } = storage;

interface initialObj {
    isShowEdit: any,
    isShowProgramlist: any,
    isShowCreateProject: any,
    blocks: any,
    modules: any,
    projectsInfo: any,
    pageLists: any
}

const initialValue: initialObj = {
    isShowEdit: {
        isShowEdit: false
    },
    isShowProgramlist: {
        isShowProgramlist: false
    },
    isShowCreateProject: {
        isShowCreateProject: false
    },
    blocks: {
        blocks: []
    },
    modules: {
        modules: []
    },
    projectsInfo: {
        projectsInfo: recordsStorage.dataStore || {}
    },
    pageLists: {
        pageLists: recordsStorage.dataStore && recordsStorage.dataStore['pageLists'] || []
    }
}

const reducers = combineReducers({
    isShowEdit: EditBlockState,
    isShowProgramlist: ProgramListState,
    isShowCreateProject: CreateProjectState,
    blocks: BlockState,
    modules: ModuleState,
    projectsInfo: ChangeProjectState,
    pageLists: SetPageListsState
});

const store = createStore(reducers, initialValue);

export default store;