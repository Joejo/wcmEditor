"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const path_1 = require("../../../Utils/path");
require("./BlockChoosed.css");
const actions_1 = require("../../../Data/Actions/actions");
class BlockChoosed extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="blocks">
                {this.props.blocks.blocks ? this.props.blocks.blocks.map((item, index) => {
            const screenShotimg = `${path_1.default}/materials/components/${item.alias}/screenshot.png`;
            return (<div className="BlockChoosed" key={index}>
                                <div className="block">
                                    <div className="screenshot">
                                        <img src={screenShotimg} alt="screenshot.png"/>
                                    </div>
                                    <div className="control">
                                        <span>up </span>
                                        <span>down </span>
                                        <span onClick={() => { this.props.onDeleteBlock(index); }}>delete</span>
                                    </div>
                                    <div className="name">{item.alias}</div>
                                </div>
                            </div>);
        }) : null}
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        blocks: state.blocks
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteBlock: (block) => {
            dispatch(actions_1.deleteBlock(block));
            dispatch(actions_1.deleteModules(block));
        },
        onDeleteModule: (module) => {
            dispatch(actions_1.deleteModules(module));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BlockChoosed);
//# sourceMappingURL=BlockChoosed.jsx.map