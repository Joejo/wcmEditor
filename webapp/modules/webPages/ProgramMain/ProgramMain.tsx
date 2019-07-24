import * as React from 'react';
import { connect } from 'react-redux';
import {
    Header,
    PageLists,
} from '../../components/index';
import ProgramBlank from '../ProgramBlank/ProgramBlank';
import { storage } from '../../../Utils';
import './ProgramMain.css';
const { projectsStorage, recordsStorage } = storage;

interface ProgramMain {
    state: any,
    props: any,
    allRecInfo: any,
    allProjInfo: any,
    pageLists: any
}

class ProgramMain extends React.Component {
    constructor(props){
        super(props);
        this.allRecInfo = recordsStorage.dataStore || {};
        this.allProjInfo = projectsStorage.dataStore || [];
        this.pageLists = [];
    }

    getPageLists(){
        this.pageLists = this.allRecInfo.pageLists ? this.allProjInfo.filter(item => item.projName === this.allRecInfo.projName)[0].pageLists || [] : [];
    }

    render(){
        const {
            projectsInfo,
            pageLists
        } = this.props;
        const pageData = [];
        const pages = pageLists.pageLists || [];
        const pinfo = projectsInfo.projectsInfo;
        for(let i = 0; i < pages.length; i++){
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
        return(
            <div className="ProgramMain">
                {
                    projectsStorage && projectsStorage.dataStore && projectsStorage.dataStore.length > 0 ?
                        <div>
                            <Header data={headerData}/>
                            <PageLists data={{pageLists: pageData}}/>
                        </div>
                    :   <ProgramBlank />
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        projectsInfo: state.projectsInfo,
        pageLists: state.pageLists
    }
}

export default connect(mapStateToProps, null)(ProgramMain);