"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
require("./PageLists.css");
const BlockBox_1 = require("../BlockBox/BlockBox");
const fs = require('fs');
const Utils_1 = require("../../../Utils");
const EditWcm_1 = require("../EditWcm/EditWcm");
const Utils_2 = require("../../../Utils");
const actions_1 = require("../../../Data/Actions/actions");
const { projectsStorage, recordsStorage } = Utils_2.storage;
class PageLists extends React.Component {
    constructor(props) {
        super(props);
        const { pageLists = [], } = props.data;
        this.state = {
            showEditWcm: false,
            pageLists: pageLists,
            fileContent: '',
        };
        this.wcmInfo = {};
        ['cancleEditing', 'saveWcm'].forEach(item => this[item] = this[item].bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            pageLists: nextProps.data.pageLists
        });
    }
    getFileContent(e) {
        const filePath = e.getAttribute('filepath');
        this.wcmInfo = {
            fileName: e.getAttribute('filename'),
            filePath: filePath
        };
        let fileContent = '';
        if (fs.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath).toString();
            this.setState({
                showEditWcm: true,
                fileContent
            });
        }
        else {
            Utils_1.notification({
                title: '读取文件失败！',
                body: '请检查文件是否存在！'
            });
        }
    }
    cancleEditing() {
        this.setState({
            showEditWcm: false
        });
    }
    generateWcmFile(fullFilePath, wcmName, content) {
        fs.writeFile(fullFilePath, content, (err) => {
            if (err)
                throw err;
            Utils_1.notification({
                title: '保存成功！',
                body: wcmName + ' 已保存至' + fullFilePath
            });
        });
        this.setState({
            showEditWcm: false
        });
    }
    saveWcm(content) {
        const { fileName, filePath } = this.wcmInfo;
        const fullFilePath = filePath;
        if (fs.existsSync(fullFilePath)) {
            var existsConfirm = window.confirm('已存在同名wcm文件，继续将会覆盖.');
        }
        else {
            this.generateWcmFile(fullFilePath, fileName, content);
        }
        if (existsConfirm) {
            this.generateWcmFile(fullFilePath, fileName, content);
        }
        else {
            return;
        }
    }
    deleteWcmFile(fullFilePath, wcmName, record) {
        if (record) {
            fs.unlinkSync(fullFilePath, (err) => {
                if (err)
                    throw err;
                Utils_1.notification({
                    title: '删除成功!',
                    body: `${wcmName} 已经从项目中删除!`
                });
            });
        }
        let allProjs = projectsStorage.dataStore;
        let allRecs = recordsStorage.dataStore;
        if (Array.isArray(allProjs)) {
            allProjs = allProjs.map((v) => {
                const pageLists = v.pageLists || [];
                const wcmIndex = pageLists.findIndex(v => v === wcmName.split('.')[0]);
                if (pageLists.length > 0 && wcmIndex >= 0) {
                    pageLists.splice(wcmIndex, 1);
                    v.pageLists = pageLists;
                }
                return v;
            });
            projectsStorage.set(allProjs);
        }
        if (Array.isArray(allRecs.pageLists)) {
            let recPageLists = allRecs.pageLists;
            if (recPageLists.length >= 0) {
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
    deleteWcm(e) {
        const fileName = e.getAttribute('filename');
        const filePath = e.getAttribute('filepath');
        const fullFilePath = filePath;
        if (fs.existsSync(fullFilePath)) {
            var existsConfirm = window.confirm('确认删除吗？删除后不可恢复。');
        }
        else {
            Utils_1.notification({
                title: '删除失败！',
                body: fileName + ' 不存在, 即将清除记录!'
            });
            this.deleteWcmFile(fullFilePath, fileName, false);
            return;
        }
        if (existsConfirm) {
            this.deleteWcmFile(fullFilePath, fileName, true);
        }
    }
    render() {
        const boxData = {
            title: '页面列表',
            subTitle: this.state.pageLists.length,
            action: [{
                    'name': '添加',
                    'callback': () => { }
                }],
        };
        const { showEditWcm, pageLists, fileContent } = this.state;
        const fileData = {
            fileContent: fileContent,
            cancleEditing: this.cancleEditing,
            saveWcm: this.saveWcm
        };
        return (<div className="PageListsWrap">
                <BlockBox_1.default data={boxData}>
                    <div className="PageLists">
                        <ul>
                            {pageLists ? pageLists.map((item, index) => {
            return (<li key={index}>
                                            {item.pageName}
                                            <span path={item.path} filename={item.fileName} filepath={item.filePath} onClick={(e) => { this.getFileContent(e.target); }}>修改</span>
                                            <span path={item.path} filename={item.fileName} filepath={item.filePath} onClick={(e) => { this.deleteWcm(e.target); }}>删除</span>
                                        </li>);
        }) : null}
                        </ul>
                    </div>
                </BlockBox_1.default>
                {showEditWcm ? <EditWcm_1.default data={fileData}/> : null}
            </div>);
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
            dispatch(actions_1.setPageLists(pageLists));
        }
    };
};
exports.default = react_redux_1.connect(null, mapDispatchToProps)(PageLists);
//# sourceMappingURL=PageLists.jsx.map