import services from './services';

const { store } = services;
const storage = {
    projectsStorage: new store('projects'),
    recordsStorage: new store('records'),
}

export default storage;