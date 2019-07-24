"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
require("./BlockBox.css");
class BlockBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { data, children, history } = this.props;
        const { title, subTitle, actions } = data;
        return (<div className="BlockBox">
                <div className="box">
                    <div className="headline">
                        <span>{title}</span>
                        {subTitle ? <i>{subTitle}</i> : null}
                        <div className="actions">
                            <a onClick={() => { history.push('/modules'); }}>添加</a>
                        </div>
                    </div>
                    {children}
                </div>
            </div>);
    }
    ;
}
exports.default = react_router_dom_1.withRouter(BlockBox);
//# sourceMappingURL=BlockBox.jsx.map