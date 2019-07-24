"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const RouterApp_1 = require("./webapp/modules/RouterApp/RouterApp");
require("./webapp/styles/reset.css");
require("./webapp/styles/common.css");
const App = function () {
    return (<RouterApp_1.default />);
};
ReactDOM.render(<App />, document.getElementById('App'));
//# sourceMappingURL=index.jsx.map