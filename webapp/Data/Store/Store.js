"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const EditBlockReducer_1 = require("../Reducers/EditBlockReducer");
const BlockReducer_1 = require("../Reducers/BlockReducer");
const ModuleReducer_1 = require("../Reducers/ModuleReducer");
const ProgramListReducer_1 = require("../Reducers/ProgramListReducer");
const CreateProjectReducer_1 = require("../Reducers/CreateProjectReducer");
const ChangeProjectReducer_1 = require("../Reducers/ChangeProjectReducer");
const SetPageListsReducer_1 = require("../Reducers/SetPageListsReducer");
const Utils_1 = require("../../Utils");
const { recordsStorage = { dataStore: {} } } = Utils_1.storage;
const initialValue = {
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
};
const reducers = redux_1.combineReducers({
    isShowEdit: EditBlockReducer_1.EditBlockReducer,
    isShowProgramlist: ProgramListReducer_1.ProgramListReducer,
    isShowCreateProject: CreateProjectReducer_1.CreateProjectReducer,
    blocks: BlockReducer_1.BlockReducer,
    modules: ModuleReducer_1.ModuleReducer,
    projectsInfo: ChangeProjectReducer_1.ChangeProjectReducer,
    pageLists: SetPageListsReducer_1.SetPageListsReducer
});
const store = redux_1.createStore(reducers, initialValue);
exports.default = store;
//# sourceMappingURL=Store.js.map