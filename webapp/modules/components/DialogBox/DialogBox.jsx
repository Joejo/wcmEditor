"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./DialogBox.css");
class DialogBox extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        const { data, children } = this.props;
        return (<section className="DialogBox">
                <div className="title">{data.title}</div>
                <div className="box">
                    {children}
                </div>
            </section>);
    }
}
exports.default = DialogBox;
//# sourceMappingURL=DialogBox.jsx.map