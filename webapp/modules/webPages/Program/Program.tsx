import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { notification } from '../../../Utils';
import ProgramMain from "../ProgramMain/ProgramMain";
import DialogBox from '../../components/DialogBox/DialogBox';
const { dialog } = require('electron').remote;
import { connect } from 'react-redux';
import { openProgramList, openCreateProject, changeProject, setPageLists } from '../../../Data/Actions/actions';
import { storage } from '../../../Utils';
import {
    Header,
} from '../../components/index';
import './Program.css';
const { projectsStorage, recordsStorage } = storage;
const fs = require('fs');

interface Program {
    state: any,
    props: any,
    refs: any,
    setState: any,
    allProjInfo: any,
    allRecInfo: any,
    initData: any
}

class Program extends React.Component{
    constructor(props){
        super(props);
        const methods = ['chooseDirectory', 'storeProjInfo'];
        methods.forEach((item) => this[item] = this[item].bind(this));
        this.allProjInfo = projectsStorage.dataStore || [];
        this.allRecInfo = recordsStorage.dataStore || {};
        const currentProj = this.allRecInfo.projName || '';
        const projList = this.allProjInfo;
        projList.forEach(item => {
            if(item.projName === currentProj){
                item.cur = "cur";
            }else{
                item.cur = '';
            }
        });
        this.state = {
            initData: {
                currentProj: currentProj,
                projList: projList
            }
        }
        this.initData = {
            currentProj: currentProj,
            projList: projList
        };
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
            this.setState({
                initData: Object.assign(this.state.initData, {projList: projects})
            });
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
        this.setState({
            initData: {
                currentProj: curProj.projName,
                projList: this.state.initData.projList.map(item => {
                    if(item.projName === curProj.projName){
                        item.cur = "cur";
                    }else{
                        item.cur = ''
                    }
                    return item;
                })
            }
        });
        const projectsInfo = {
            projName: curProj.projName,
            projPath: curProj.projPath,
            pageLists: curProj.pageLists
        };
        recordsStorage.set(projectsInfo);
        this.props.onChangeProject(projectsInfo);
        this.props.onSetPageLists(curProj.pageLists);
    }

    delProj(event, projName){
        event.preventDefault();
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        var existsConfirm = window.confirm('删除项目会将所属wcm文件全部删除，确认删除吗？');
        if(existsConfirm){
            let allProjs = projectsStorage.dataStore;
            let originAllProjs = projectsStorage.dataStore;
            allProjs = allProjs.filter(v => v.projName != projName);
            this.setState({
                initData: Object.assign(this.state.initData, {projList: allProjs})
            });
            //删除文件
            const pointProj = originAllProjs.filter(v => v.projName === projName) || [];
            const fullFilePath = pointProj[0].projPath;
            const pageLists = pointProj[0].pageLists || [];
            const len = pageLists.length;

            if(len > 0){
                for(let i = 0; i < len; i++){
                    let wcmPath = `${fullFilePath}/${pageLists[i]}.wcm`;
                    fs.unlinkSync(wcmPath, (err) => {
                        if (err) throw err;
                    });
                }
            }

            projectsStorage.set(allProjs);
            notification({
                title: '删除成功!',
                body: `${projName} 及相关文件已经从项目中删除!`
            });
        }else{
            return;
        }
    }

    render(){
        const {
            isShowProgramlist,
            onShowProgramList,
            onHideProgramList,
            onShowCreateProject,
            onHideCreateProject,
            isShowCreateProject
        } = this.props;

        const { initData } = this.state;
        const {
            currentProj,
            projList
        } = initData;

        return(
            <div className="Program">
                <ProgramMain data={{callback: onShowProgramList}} />
                {
                    isShowProgramlist.isShowProgramlist ? (
                        <div className="programList">
                            <div className="mask" onClick={onHideProgramList}></div>
                            <div className="programs">
                                <div className="curProgramName">
                                    <Header data={{title: currentProj, arrow: true}}/>
                                </div>
                                <ul className="lists">
                                    {
                                        projList.map((item, index) => {
                                            return (
                                                <li onClick={this.changeProj.bind(this, item.projName)} key={index} className={item.cur}>
                                                    {item.projName}
                                                    <span onClick={(e) => {this.delProj(e, item.projName)}}>删</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <div className="createProgramWrap">
                                    <button onClick={onShowCreateProject}>创建项目</button>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
                {
                    isShowCreateProject.isShowCreateProject ? (
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
                    ) : null
                }
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
        onShowProgramList: () => {
            dispatch(openProgramList(true))
        },
        onHideProgramList: () => {
            dispatch(openProgramList(false))
        },
        onShowCreateProject: () => {
            dispatch(openCreateProject(true))
        },
        onHideCreateProject: () => {
            dispatch(openCreateProject(false))
        },
        onChangeProject: (projectsInfo) => {
            dispatch(changeProject(projectsInfo))
        },
        onSetPageLists: (pageLists) => {
            dispatch(setPageLists(pageLists))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Program));
