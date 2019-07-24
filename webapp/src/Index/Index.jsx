"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const modules_1 = require("../../modules");
require("./Index.css");
class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="Wrap">
                <modules_1.SideBar />
                <modules_1.Body />
            </div>);
    }
}
exports.default = Index;
//# sourceMappingURL=Index.jsx.map