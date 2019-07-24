"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
const { store } = services_1.default;
const storage = {
    projectsStorage: new store('projects'),
    recordsStorage: new store('records'),
};
exports.default = storage;
//# sourceMappingURL=storage.js.map