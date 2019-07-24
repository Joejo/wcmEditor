"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./SideBar.css");
class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="SideBar">
                <ul>
                    <li>
                        <react_router_dom_1.Link to='/'>项目</react_router_dom_1.Link>
                    </li>
                    <li>
                        <react_router_dom_1.Link to='/modules'>模板</react_router_dom_1.Link>
                    </li>
                    <li>
                        <react_router_dom_1.Link to='/setting'>设置</react_router_dom_1.Link>
                    </li>
                </ul>
                <div className="help">
                    <react_router_dom_1.Link to='/help'>帮助</react_router_dom_1.Link>
                </div>
            </div>);
    }
}
exports.default = SideBar;
//# sourceMappingURL=SideBar.jsx.map