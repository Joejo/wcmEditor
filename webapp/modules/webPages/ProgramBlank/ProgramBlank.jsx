"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
require("./ProgramBlank.css");
const components_1 = require("../../components");
const actions_1 = require("../../../Data/Actions/actions");
class ProgramBlank extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onShowCreateProject, isShowCreateProject } = this.props;
        return (<div className="ProgramBlank">
                <button className="create" onClick={onShowCreateProject}>创建项目</button>
                {isShowCreateProject.isShowCreateProject ? <components_1.CreateProgram /> : null}
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        isShowProgramlist: state.isShowProgramlist,
        isShowCreateProject: state.isShowCreateProject,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onShowCreateProject: () => {
            dispatch(actions_1.openCreateProject(true));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ProgramBlank);
//# sourceMappingURL=ProgramBlank.jsx.map