"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./EditWcm.css");
class EditWcm extends React.Component {
    constructor(props) {
        super(props);
        ['getEditHtml'].forEach(item => this[item] = this[item].bind(this));
    }
    getEditHtml() {
        return this.refs.editArea.innerHTML;
    }
    render() {
        const { fileContent, cancleEditing, saveWcm } = this.props.data;
        return (<div className="EditWcm">
                <div className="mask"></div>
                <div className="editWrap">
                    <div className="editBox" contentEditable="true">
                        <section ref="editArea" className="editArea" dangerouslySetInnerHTML={{ __html: fileContent }}>
                        </section>
                    </div>
                    <div className="button">
                        <button className="cancle">
                            <span onClick={cancleEditing}>取消</span>
                        </button>
                        <button>
                            <span onClick={() => { saveWcm(this.getEditHtml()); }}>保存并生成WCM</span>
                        </button>
                    </div>
                </div>
            </div>);
    }
}
exports.default = EditWcm;
//# sourceMappingURL=EditWcm.jsx.map