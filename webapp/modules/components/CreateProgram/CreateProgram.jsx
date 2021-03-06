"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const { dialog } = require('electron').remote;
const DialogBox_1 = require("../DialogBox/DialogBox");
const Utils_1 = require("../../../Utils");
const { projectsStorage, recordsStorage } = Utils_1.storage;
require("./CreateProgram.css");
const actions_1 = require("../../../Data/Actions/actions");
class CreateProgram extends React.Component {
    constructor(props) {
        super(props);
        const methods = ['chooseDirectory', 'storeProjInfo'];
        methods.forEach((item) => this[item] = this[item].bind(this));
    }
    chooseDirectory() {
        dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'], message: '请选择项目保存路径' }, filePath => {
            if (!filePath) {
                return;
            }
            const path = filePath[0];
            this.refs.projPathDom.innerHTML = path;
        });
    }
    checkProjInfo(value) {
        if (value.trim() === '') {
            return false;
        }
        return true;
    }
    checkExist(projs, value) {
        const hasExistProj = projs.some(item => {
            return item.projName === value;
        });
        if (hasExistProj) {
            alert('同名项目已存在！');
        }
        return hasExistProj;
    }
    setProjRecord(projects) {
        recordsStorage.set(projects[0]);
    }
    storeProjInfo() {
        const projPath = this.refs.projPathDom.innerHTML;
        const projName = this.refs.projNameDom.value;
        const projects = projectsStorage.dataStore || [];
        if (this.checkProjInfo(projPath) && this.checkProjInfo(projName) && !this.checkExist(projects, projName)) {
            const projInfo = { projName: projName, projPath: projPath };
            //新添加的项目总是被当成当成编辑项目
            projects.unshift(projInfo);
            projectsStorage.set(projects);
            // this.setState({
            //     initData: Object.assign(this.state.initData, {projList: projects})
            // });
            this.setProjRecord(projects);
            this.changeProj(projName);
            this.props.onHideCreateProject();
        }
    }
    getProjInfo(projName) {
        return projectsStorage.dataStore.filter(item => item.projName === projName);
    }
    changeProj(projName) {
        const curProj = this.getProjInfo(projName)[0];
        if (!curProj.pageLists) {
            curProj.pageLists = {
                pageLists: []
            };
        }
        const projectsInfo = {
            projName: curProj.projName,
            projPath: curProj.projPath,
            pageLists: curProj.pageLists || []
        };
        recordsStorage.set(projectsInfo);
        this.props.onChangeProject(projectsInfo);
    }
    render() {
        const { onHideCreateProject, isShowCreateProject } = this.props;
        return (<div className="pageForm">
                <div className="mask"></div>
                <DialogBox_1.default data={{ title: '创建项目' }}>
                    <div className="wcmInfoForm">
                        <div className="item">
                            <div className="info"><span className="ico">*</span> 路径:</div>
                            <div className="fileDialog" ref="projPathDom" onClick={this.chooseDirectory}/>
                        </div>
                        <div className="item">
                            <div className="info"><span className="ico">*</span> 项目名:</div>
                            <input type="text" ref="projNameDom"/>
                        </div>
                        <div className="item">
                            <div className="btns">
                                <button className="" onClick={this.storeProjInfo}>保存</button>
                                <button className="cancle" onClick={onHideCreateProject}>取消</button>
                            </div>
                        </div>
                    </div>
                </DialogBox_1.default>
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
        onChangeProject: (projectsInfo) => {
            dispatch(actions_1.changeProject(projectsInfo));
        },
        onHideCreateProject: () => {
            dispatch(actions_1.openCreateProject(false));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CreateProgram);
//# sourceMappingURL=CreateProgram.jsx.map