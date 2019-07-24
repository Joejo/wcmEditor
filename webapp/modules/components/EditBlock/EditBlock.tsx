import * as React from 'react';
import { connect } from 'react-redux';
import { closeEditBlock, setPageLists } from '../../../Data/Actions/actions';
import {
    storage,
    notification,
    TextEditor,
} from '../../../Utils';
import './EditBlock.css';
import DialogBox from '../DialogBox/DialogBox';
const { dialog } = require('electron').remote;
const fs = require('fs');
const { projectsStorage, recordsStorage } = storage;

interface EditBlock {
    props: any,
    state: any,
    setState: any,
    refs: any,
    allProjs: any,
    recProj: any,
    editor: any,
    options: any,
    container: any
}

class EditBlock extends React.Component{
    constructor(props){
        super(props);
        const methods = ['getEditHtml', 'hideDialog', 'saveWcm', 'goOn'];
        methods.forEach((item) => this[item] = this[item].bind(this));
        this.allProjs = projectsStorage.dataStore;
        this.recProj = recordsStorage.dataStore;
        this.state = {
            showPageForm: false,
            showWcmSuccessDialog: false,
            wcmPath: '',
            wcmHtml: '',
            wcmName: ''
        }

        this.options = {
            buttons: [
                'header1',
                'header2',
                'bold',
                'italic',
                'underline',
                'anchor',
                'quote',
                'unorderedlist',
                'orderedlist',
                'strikethrough',
                'superscript',
                'subscript',
                'image',
                'orderedlist',
                'unorderedlist',
                'pre',
                'indent',
                'outdent',
                'justifyCenter',
                'justifyFull',
                'justifyLeft',
                'justifyRight'
            ],
                firstHeader: 'h1',
                secondHeader: 'h2',
                diffLeft: 0,
                diffTop: -10,
                disableDoubleReturn: true
        }
    }

    componentDidMount(){
        this.editor = new (TextEditor as any)(this.container, this.props.options);
    }

    componentWillUnmount() {
        this.editor.deactivate();
    }

    checkProjIsBlank(){
        return projectsStorage.dataStore;
    }

    getEditHtml(){

        if(!this.checkProjIsBlank()){
            alert('请先创建项目！');
            return;
        }
        const editHtml = document.querySelector('.editBox').innerHTML;
        this.setState({
            showPageForm: true,
            wcmHtml: editHtml
        });
    }

/*    showDialog(){
        dialog.showOpenDialog({ properties: ['openDirectory', 'createDirectory', 'promptToCreate'], message: '请选择WCM文件保存路径' }, (filepath) => {
            if(!filepath){
                return;
            }
            const path = filepath[0];
            this.refs.fileDialog.innerHTML = path;
            this.setState({
                wcmPath: path
            });
        });
    }*/

    hideDialog(){
        this.setState({
            showPageForm: false,
            wcmPath: '',
            wcmHtml: '',
            wcmName: ''
        });
    }

    generateWcmFile(fullFilePath, wcmName, style){
        const content = '\n' + style + '\n' + this.state.wcmHtml + '\n';
        fs.writeFile(fullFilePath, content, (err) => {
            if (err) throw err;
            notification({
                title: '保存成功！',
                body: wcmName + '.wcm 已保存至' + fullFilePath
            });
            this.setState({
                wcmName: this.refs.wcmName.value,
                showPageForm: false,
                showWcmSuccessDialog: true
            });
        });

        this.refs.fileDialog.innerHTML = fullFilePath;
        this.setState({
            wcmPath: fullFilePath
        });
    }

    getBlockStyle(blocks){
        const blockName = blocks.map(block => block.alias);
        const bcks = [...new Set(blockName)];
        const styleNodes = Array.from(document.querySelectorAll('style'));
        const selectedStyleNodes = [];
        let styleInnerHtml = '';

        styleNodes.forEach(node => {
            for(let item of bcks) {
                if (node.getAttribute('filename') === item) {
                    selectedStyleNodes.push(node);
                }
            }
        });

        for(let node of selectedStyleNodes){
            styleInnerHtml += (node.innerHTML + '\n');
        }

        styleInnerHtml = '<style>' + '\n' + styleInnerHtml + '</style>';

        return styleInnerHtml;
    }

    addProjPage(projName){
        const projs = this.allProjs.map(item => {
            if(item.projName === this.recProj.projName){
                const pageLists = item.pageLists || [];
                const curProjNames = pageLists.find(item => item === projName) || [];
                if(curProjNames.length < 1){
                    pageLists.push(projName);
                    item.pageLists = pageLists;
                }
            }
            return item;
        });
        const recPage = this.recProj.pageLists || [];
        const curRecPages = recPage.find(item => item === projName) || [];
        if(curRecPages.length < 1){
            recPage.push(projName);
        }
        this.recProj.pageLists = recPage;

        const allProjs = JSON.parse(JSON.stringify(projs));
        const recProj = JSON.parse(JSON.stringify(this.recProj));
        projectsStorage.set(allProjs);
        recordsStorage.set(recProj);
        this.props.onSetPageLists(recPage);
    }

    saveWcm(){
        const wcmName = this.refs.wcmName.value;
        const fullFilePath = recordsStorage.dataStore.projPath + '/' + wcmName + '.wcm';
        const style = this.getBlockStyle(this.props.blocks.blocks);
        if(fs.existsSync(fullFilePath)){
            var existsConfirm = window.confirm('已存在同名wcm文件，继续将会覆盖.');
        }else{
            this.generateWcmFile(fullFilePath, wcmName, style);
            this.addProjPage(wcmName);
        }

        if(existsConfirm){
            this.generateWcmFile(fullFilePath, wcmName, style);
            this.addProjPage(wcmName);
        }else{
            return;
        }
    }

    goOn(){
        this.setState({
            showWcmSuccessDialog: false,
            wcmPath: '',
            wcmHtml: '',
            wcmName: ''
        });
    }

    _onBlur() {
        console.log(this);
        this.props.onChange({
            text: this.container.textContent,
            html: this.container.innerHTML
        })
    }

    render(){
        const {
            wcmName,
            wcmPath,
            showPageForm,
            showWcmSuccessDialog,
        } = this.state;
        const modules = this.props.modules.modules;
        const blocks = this.props.blocks.blocks;
        const content = this.props.content || {
            text: '',
                html: ''
            };

        return(
            <div className="EditBlock">
                <div className="mask"></div>
                <div className="editWrap">
                    <div className="editBox" contentEditable="true"
                         onBlur={this._onBlur.bind(this)}
                         role="textarea"
                         aria-multiline="true"
                         ref={el => (this.container = el)}
                         >
                        <section className="editArea">
                            {
                                modules ? modules.map((item, index) => {
                                    const Default = item.default;
                                    return (
                                        <div key={index}>
                                            <Default />
                                        </div>
                                    )
                                }) : null
                            }
                        </section>
                    </div>
                    <div className="button">
                        <button className="cancle" onClick={this.props.onCloseEditBlock}>
                            <span>取消</span>
                        </button>
                        <button>
                            <span onClick={this.getEditHtml}>保存并生成WCM</span>
                        </button>
                    </div>
                </div>
                {
                    showPageForm ? (
                        <div className="pageForm">
                            <div className="mask"></div>
                            <DialogBox data={{title: '保存wcm'}}>
                                <div className="wcmInfoForm">
                                    <div className="item">
                                        <div className="info"><span className="ico">*</span> 路径:</div>
                                        <div className="fileDialog" ref="fileDialog">{recordsStorage.dataStore.projPath + '/'}</div>
                                    </div>
                                    <div className="item">
                                        <div className="info"><span className="ico">*</span> wcm名称:</div>
                                        <input type="text" ref="wcmName"/>
                                    </div>
                                    <div className="item">
                                        <div className="btns">
                                            <button className="" onClick={this.saveWcm}>保存</button>
                                            <button className="cancle" onClick={this.hideDialog}>取消</button>
                                        </div>
                                    </div>
                                </div>
                            </DialogBox>
                        </div>
                    ) : null
                }
                {
                    showWcmSuccessDialog ? (
                        <div className="wcmNotify">
                            <div className="mask"></div>
                            <DialogBox data={{title: '保存成功'}}>
                                <div className="wcmNotifyCallback">
                                    <div className="info">
                                        {wcmName}.wcm 已经保存到：{wcmPath}
                                    </div>
                                    <div className="btns">
                                        <button>查看WCM文件</button>
                                        <button onClick={this.goOn}>继续</button>
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
        modules: state.modules,
        blocks: state.blocks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseEditBlock: () => {
            dispatch(closeEditBlock(false));
        },
        onSetPageLists: (pageLists) => {
            dispatch(setPageLists(pageLists))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBlock);