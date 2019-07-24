"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../../Data/Actions/actions");
const components_1 = require("../../components");
require("./Components.css");
class Components extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowEdit: false
        };
        const methods = ['showEdit', 'hideEdit'];
        methods.forEach((method) => this[method] = this[method].bind(this));
    }
    showEdit() {
        this.setState({
            isShowEdit: true
        });
    }
    hideEdit() {
        this.props.history.push('/');
        this.setState({
            isShowEdit: false
        });
    }
    render() {
        const { isShowEdit, blocks } = this.props;
        const headerData = {
            title: '添加页面',
        };
        return (<div className="Components">
                <components_1.Header data={headerData}></components_1.Header>
                <div className="materialsMain flex-hrz">
                    <div className="materialsLists">
                        <div className="header">模板物料库</div>
                        <div className="materials flex-hrz">
                            <components_1.BlockComponent></components_1.BlockComponent>
                        </div>
                    </div>
                    <div className="choosedLists flex-full">
                        <div className="header">已选模板（{blocks.blocks ? blocks.blocks.length : 0}）</div>
                        <div className="choosedBlocks">
                            <components_1.BlockChoosed></components_1.BlockChoosed>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="cancle" onClick={this.hideEdit}>
                            <span>取消</span>
                        </button>
                        <button>
                            <span onClick={() => { this.props.onShowEdit(blocks.blocks); }}>生成模板</span>
                        </button>
                    </div>
                </div>
                {isShowEdit.isShowEdit ? <components_1.EditBlock></components_1.EditBlock> : null}
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        isShowEdit: state.isShowEdit,
        blocks: state.blocks
    };
};
const blockAnalyse = (blocks, dispatch) => {
    const blcs = blocks;
    const moduleImps = [];
    blcs.forEach((item) => {
        const moduleName = item.alias;
        // require, import context must run in a string parameter in webpack
        const curMod = Promise.resolve().then(() => require('../../../../materials/components/' + moduleName + '/' + moduleName + '.tsx'));
        moduleImps.push(curMod);
    });
    Promise.all(moduleImps).then((modules) => {
        dispatch(actions_1.addModules(modules));
    }).catch((err) => {
        console.warn('加载已选物料错误：', err);
    });
};
const mapDispatchToProps = (dispatch) => {
    return {
        onShowEdit: (blocks) => {
            if (blocks.length === 0) {
                alert('请选择模板!');
                return;
            }
            blockAnalyse(blocks, dispatch);
            dispatch(actions_1.openEditBlock(true));
        }
    };
};
exports.default = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Components));
//# sourceMappingURL=Components.jsx.map