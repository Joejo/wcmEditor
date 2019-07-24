"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Store_1 = require("../../Data/Store/Store");
const SideBar_1 = require("../SideBar/SideBar");
const Program_1 = require("../webPages/Program/Program");
const Setting_1 = require("../webPages/Setting/Setting");
const Help_1 = require("../webPages/Help/Help");
const Components_1 = require("../webPages/Components/Components");
require("./RouterApp.css");
class RouterApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<react_redux_1.Provider store={Store_1.default}>
                <react_router_dom_1.BrowserRouter>
                    <div className="wrap flex-hrz">
                        <SideBar_1.default />
                        <div className="content flex-full">
                            <react_router_dom_1.Switch>
                                <react_router_dom_1.Route exact path='/' component={Program_1.default}></react_router_dom_1.Route>
                                <react_router_dom_1.Route exact path='/modules' component={Components_1.default}></react_router_dom_1.Route>
                                <react_router_dom_1.Route exact path='/setting' component={Setting_1.default}></react_router_dom_1.Route>
                                <react_router_dom_1.Route exact path='/help' component={Help_1.default}></react_router_dom_1.Route>
                            </react_router_dom_1.Switch>
                        </div>
                    </div>
                </react_router_dom_1.BrowserRouter>
            </react_redux_1.Provider>);
    }
}
exports.default = RouterApp;
//# sourceMappingURL=RouterApp.jsx.map