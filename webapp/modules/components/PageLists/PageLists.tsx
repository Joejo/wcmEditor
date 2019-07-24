import * as React from 'react';
import { connect } from 'react-redux';
import './PageLists.css';
import BlockBox from '../BlockBox/BlockBox';
const fs = require('fs');
import { notification } from '../../../Utils';
import EditWcm from '../EditWcm/EditWcm';
import PreviewWcm from '../PreviewWcm/PreviewWcm';
import { storage } from '../../../Utils';
import {setPageLists} from '../../../Data/Actions/actions';
const { projectsStorage, recordsStorage } = storage;

interface PageLists {
    state: any,
    props: any,
    setState: any,
    wcmInfo: any
}

class PageLists extends React.Component{
    constructor(props){
        super(props);
        const {
            pageLists = [],
        } = props.data;

        this.state = {
            showEditWcm: false,
            previewEditWcm: false,
            pageLists: pageLists,
            fileContent: '',
        };
        this.wcmInfo = {};
        ['cancleEditing', 'canclePreviewing', 'saveWcm'].forEach(item => this[item] = this[item].bind(this));
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            pageLists: nextProps.data.pageLists
        });
    }

    getContent(e){
        return new Promise((resolve, reject) => {
            const filePath = e.getAttribute('filepath');
            this.wcmInfo = {
                fileName: e.getAttribute('filename'),
                filePath: filePath
            };
            let fileContent = '';
            if(fs.existsSync(filePath)){
                fileContent = fs.readFileSync(filePath).toString();
                resolve(fileContent);
            }else{
                notification({
                    title: '读取文件失败！',
                    body: '请检查文件是否存在！'
                });
                return null;
            }
        });
    }

    getFileContent(e){
        this.getContent(e).then((content) => {
            this.setState({
                showEditWcm: true,
                fileContent: content
            });
        });
    }

    previewWcm(e){
        this.getContent(e).then((content) => {
            this.setState({
                previewEditWcm: true,
                fileContent: content
            });
        });
    }

    cancleEditing(){
        this.setState({
            showEditWcm: false
        });
    }

    canclePreviewing(){
        this.setState({
            previewEditWcm: false
        });
    }

    generateWcmFile(fullFilePath, wcmName, content){
        fs.writeFile(fullFilePath, content, (err) => {
            if (err) throw err;
            notification({
                title: '保存成功！',
                body: wcmName + ' 已保存至' + fullFilePath
            });
        });

        this.setState({
            showEditWcm: false
        });
    }

    saveWcm(content){
        const {
            fileName,
            filePath
        } = this.wcmInfo;
        const fullFilePath = filePath;
        if(fs.existsSync(fullFilePath)){
            var existsConfirm = window.confirm('已存在同名wcm文件，继续将会覆盖.');
        }else{
            this.generateWcmFile(fullFilePath, fileName, content);
        }

        if(existsConfirm){
            this.generateWcmFile(fullFilePath, fileName, content);
        }else{
            return;
        }
    }

    deleteWcmFile(fullFilePath, wcmName, record){
        if(record){
            fs.unlinkSync(fullFilePath, (err) => {
                if (err) throw err;
                notification({
                    title: '删除成功!',
                    body: `${wcmName} 已经从项目中删除!`
                });
            });
        }

        let allProjs = projectsStorage.dataStore;
        let allRecs = recordsStorage.dataStore;
        if(Array.isArray(allProjs)){
            allProjs = allProjs.map((v) => {
                const pageLists = v.pageLists || [];
                const wcmIndex = pageLists.findIndex(v => v === wcmName.split('.')[0]);
                if(pageLists.length > 0 && wcmIndex >= 0){
                    pageLists.splice(wcmIndex, 1);
                    v.pageLists = pageLists;
                }
                return v;
            });
            projectsStorage.set(allProjs);
        }

        if(Array.isArray(allRecs.pageLists)){
            let recPageLists = allRecs.pageLists;
            if(recPageLists.length >= 0){
                const wcmIndex = recPageLists.findIndex(v => v === wcmName.split('.')[0]);
                recPageLists.splice(wcmIndex, 1);
                allRecs.pageLists = recPageLists;
            }
            recordsStorage.set(allRecs);
        }

        this.setState({
            showEditWcm: false
        });

        this.props.onSetPageLists(allRecs.pageLists);
    }

    deleteWcm(e){
        const fileName = e.getAttribute('filename');
        const filePath = e.getAttribute('filepath');
        const fullFilePath = filePath;

        if(fs.existsSync(fullFilePath)){
            var existsConfirm = window.confirm('确认删除吗？删除后不可恢复。');
        }else{
            notification({
                title: '删除失败！',
                body: fileName + ' 不存在, 即将清除记录!'
            });

            this.deleteWcmFile(fullFilePath, fileName, false);
            return;
        }

        if(existsConfirm){
            this.deleteWcmFile(fullFilePath, fileName, true);
        }
    }

    render(){
        const boxData = {
            title: '页面列表',
            subTitle: this.state.pageLists.length,
            action: [{
                'name': '添加',
                'callback': () => {}
            }],
        };

        const {
            showEditWcm,
            previewEditWcm,
            pageLists,
            fileContent
        } = this.state;
        const fileData = {
            fileContent: fileContent,
            cancleEditing: this.cancleEditing,
            canclePreviewing: this.canclePreviewing,
            saveWcm: this.saveWcm
        };

        return(
            <div className="PageListsWrap">
                <BlockBox data={boxData}>
                    <div className="PageLists">
                        <ul>
                            {
                                pageLists ? pageLists.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item.pageName}
                                            <span path={item.path} filename={item.fileName} filepath={item.filePath} onClick={(e) => { this.previewWcm(e.target)}}>预览</span>
                                            <span path={item.path} filename={item.fileName} filepath={item.filePath} onClick={(e) => { this.getFileContent(e.target)}}>修改</span>
                                            <span path={item.path} filename={item.fileName} filepath={item.filePath} onClick={(e) => { this.deleteWcm(e.target)}}>删除</span>
                                        </li>
                                    )
                                }) : null
                            }
                        </ul>
                    </div>
                </BlockBox>
                {showEditWcm ? <EditWcm data={fileData}/>: null}
                {previewEditWcm ? <PreviewWcm data={fileData}/>: null}
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         pageLists: state.pageLists
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        onSetPageLists: (pageLists) => {
            dispatch(setPageLists(pageLists))
        }
    }
};

export default connect(null, mapDispatchToProps)(PageLists);