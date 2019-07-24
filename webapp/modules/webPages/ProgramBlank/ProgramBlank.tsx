import * as React from 'react';
import { connect } from 'react-redux';
import './ProgramBlank.css';
import { CreateProgram } from '../../components';
import { openCreateProject } from "../../../Data/Actions/actions";

interface ProgramBlank {
    props: any
}
class ProgramBlank extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        const {
            onShowCreateProject,
            isShowCreateProject
        } = this.props;

        return(
            <div className="ProgramBlank">
                <button className="create" onClick={onShowCreateProject}>创建项目</button>
                { isShowCreateProject.isShowCreateProject ? <CreateProgram /> : null }
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
        onShowCreateProject: () => {
            dispatch(openCreateProject(true))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramBlank);