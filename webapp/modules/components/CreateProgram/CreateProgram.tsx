import * as React from 'react';
import { connect } from 'react-redux';
const { dialog } = require('electron').remote;
import DialogBox from'../DialogBox/DialogBox';
import { storage } from '../../../Utils';
const { projectsStorage, recordsStorage } = storage;
import './CreateProgram.css';
import {changeProject, openCreateProject} from "../../../Data/Actions/actions";

interface CreateProgram {
    state: any,
    props: any,
    refs: any,
    setState: any,
    allProjInfo: any,
    allRecInfo: any,
    initData: any
}

class CreateProgram extends React.Component{
    constructor(props){
        super(props);
        const methods = ['chooseDirectory', 'storeProjInfo'];
        methods.forEach((item) => this[item] = this[item].bind(this));
    }

    chooseDirectory(){
        dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'], message: '请选择项目保存路径' }, filePath => {
            if(!filePath){
                return;
            }
            const path = filePath[0];
            this.refs.projPathDom.innerHTML = path;
        });
    }

    checkProjInfo(value: String){
        if(value.trim() === ''){
            return false;
        }
        return true;
    }

    checkExist(projs: any, value: String){
        const hasExistProj = projs.some(item => {
            return item.projName === value
        });

        if(hasExistProj){
            alert('同名项目已存在！');
        }
        return hasExistProj;
    }

    setProjRecord(projects){
        recordsStorage.set(projects[0]);
    }

    storeProjInfo(){
        const projPath = this.refs.projPathDom.innerHTML;
        const projName = this.refs.projNameDom.value;
        const projects = projectsStorage.dataStore || [];
        if(this.checkProjInfo(projPath) && this.checkProjInfo(projName) && !this.checkExist(projects, projName) ){
            const projInfo = {projName: projName, projPath: projPath};
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

    getProjInfo(projName){
        return projectsStorage.dataStore.filter(item => item.projName === projName);
    }

    changeProj(projName){
        const curProj = this.getProjInfo(projName)[0];
        if(!curProj.pageLists){
            curProj.pageLists = {
                pageLists: []
            }
        }
        const projectsInfo = {
            projName: curProj.projName,
            projPath: curProj.projPath,
            pageLists: curProj.pageLists || []
        };
        recordsStorage.set(projectsInfo);
        this.props.onChangeProject(projectsInfo);
    }

    render(){
        const {
            onHideCreateProject,
            isShowCreateProject
        } = this.props;

        return(
            <div className="pageForm">
                <div className="mask"></div>
                <DialogBox data={{title: '创建项目'}}>
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
                </DialogBox>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isShowProgramlist: state.isShowProgramlist,
        isShowCreateProject: state.isShowCreateProject,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        onChangeProject: (projectsInfo) => {
            dispatch(changeProject(projectsInfo))
        },
        onHideCreateProject: () => {
            dispatch(openCreateProject(false))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProgram);