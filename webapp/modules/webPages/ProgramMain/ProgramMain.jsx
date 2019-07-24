"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const index_1 = require("../../components/index");
const ProgramBlank_1 = require("../ProgramBlank/ProgramBlank");
const Utils_1 = require("../../../Utils");
require("./ProgramMain.css");
const { projectsStorage, recordsStorage } = Utils_1.storage;
class ProgramMain extends React.Component {
    constructor(props) {
        super(props);
        this.allRecInfo = recordsStorage.dataStore || {};
        this.allProjInfo = projectsStorage.dataStore || [];
        this.pageLists = [];
    }
    getPageLists() {
        this.pageLists = this.allRecInfo.pageLists ? this.allProjInfo.filter(item => item.projName === this.allRecInfo.projName)[0].pageLists || [] : [];
    }
    render() {
        const { projectsInfo, pageLists } = this.props;
        const pageData = [];
        const pages = pageLists.pageLists || [];
        const pinfo = projectsInfo.projectsInfo;
        for (let i = 0; i < pages.length; i++) {
            pageData[i] = {};
            pageData[i]['pageName'] = pages[i];
            pageData[i]['filePath'] = pinfo.projPath + `/${pages[i]}.wcm`;
            pageData[i]['fileName'] = `${pages[i]}.wcm`;
            pageData[i]['path'] = pinfo.projPath;
        }
        const headerData = {
            title: pinfo.projName || '',
            arrow: true,
            callback: this.props.data.callback
        };
        console.log(pageData);
        return (<div className="ProgramMain">
                {projectsStorage && projectsStorage.dataStore && projectsStorage.dataStore.length > 0 ?
            <div>
                            <index_1.Header data={headerData}/>
                            <index_1.PageLists data={{ pageLists: pageData }}/>
                        </div>
            : <ProgramBlank_1.default />}
            </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        projectsInfo: state.projectsInfo,
        pageLists: state.pageLists
    };
};
exports.default = react_redux_1.connect(mapStateToProps, null)(ProgramMain);
//# sourceMappingURL=ProgramMain.jsx.map