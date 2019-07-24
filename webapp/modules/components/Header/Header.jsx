"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./Header.css");
function Header(props) {
    const { title, arrow, callback } = props.data;
    return (<div className="Header">
            <div className="title" onClick={callback ? callback : () => { }}>
                <span>{title} {arrow ? <i className="arrow-bottom"></i> : null}</span>
            </div>
        </div>);
}
exports.default = Header;
//# sourceMappingURL=Header.jsx.map