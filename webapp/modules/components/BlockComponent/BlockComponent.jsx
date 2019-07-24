"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const Utils_1 = require("../../../Utils");
const actions_1 = require("../../../Data/Actions/actions");
require("./BlockComponent.css");
const path_1 = require("../../../Utils/path");

class BlockComponent extends React.Component {
    constructor(props) {
        super(props);
        this.blockLists = Utils_1.getBlocks;
    }
    render() {
        return (<div className="blocks flex-hrz">
                {this.blockLists ? this.blockLists.map((item, index) => {
            const screenShotimg = `${path_1.default}/materials/components/${item.alias}/screenshot.png`;
            return (<div className="BlockComponent" title="选择模板" key={index} onClick={() => { this.props.onAddBlock(item); }}>
                                <section className="block">
                                    <div className="screenshop">
                                        <img src={screenShotimg} alt="screenshot.png"/>
                                    </div>
                                    <div className="info">
                                        <div className="name">{item.name}</div>
                                        <div className="alias">{item.alias}</div>
                                    </div>
                                </section>
                            </div>);
        }) : null}
            </div>);
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAddBlock: (block) => {
            dispatch(actions_1.addBlock(block));
        }
    };
};
exports.default = react_redux_1.connect(null, mapDispatchToProps)(BlockComponent);
//# sourceMappingURL=BlockComponent.jsx.map