import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { openEditBlock, addModules } from '../../../Data/Actions/actions';
import {
    Header,
    BlockComponent,
    BlockChoosed,
    EditBlock,
} from '../../components';
import './Components.css';

interface Components {
    props: any,
    state: {
        isShowEdit: any
    },
    setState: any
}

class Components extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isShowEdit: false
        }
        const methods = ['showEdit', 'hideEdit'];
        methods.forEach((method) => this[method] = this[method].bind(this));
    }

    showEdit(){
        this.setState({
            isShowEdit: true
        });
    }

    hideEdit(){
        this.props.history.push('/');
        this.setState({
            isShowEdit: false
        });
    }

    render(){
        const {
            isShowEdit,
            blocks
        } = this.props;

        const headerData = {
            title: '添加页面',
        };

        return(
            <div className="Components">
                <Header data={headerData}></Header>
                <div className="materialsMain flex-hrz">
                    <div className="materialsLists">
                        <div className="header">模板物料库</div>
                        <div className="materials flex-hrz">
                            <BlockComponent></BlockComponent>
                        </div>
                    </div>
                    <div className="choosedLists flex-full">
                        <div className="header">已选模板（{blocks.blocks ? blocks.blocks.length : 0}）</div>
                        <div className="choosedBlocks">
                            <BlockChoosed></BlockChoosed>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="cancle" onClick={this.hideEdit}>
                            <span>取消</span>
                        </button>
                        <button>
                            <span onClick={ () => {this.props.onShowEdit(blocks.blocks)}}>生成模板</span>
                        </button>
                    </div>
                </div>
                {isShowEdit.isShowEdit ? <EditBlock></EditBlock> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isShowEdit: state.isShowEdit,
        blocks: state.blocks
    }
}

const blockAnalyse = (blocks: object, dispatch: any) => {
    const blcs: any = blocks;
    const moduleImps: any = [];

    blcs.forEach((item) => {
        const moduleName = item.alias;
        // require, import context must run in a string parameter in webpack
        const curMod = import('../../../../materials/components/' + moduleName + '/' + moduleName + '.tsx');
        moduleImps.push(curMod);
    });

    Promise.all(moduleImps).then((modules) => {
        dispatch(addModules(modules));
    }).catch((err) => {
        console.warn('加载已选物料错误：', err);
    });
}

const mapDispatchToProps = (dispatch) => {
    return {
        onShowEdit: (blocks) => {
            if(blocks.length === 0){
                alert('请选择模板!');
                return;
            }
            blockAnalyse(blocks, dispatch);
            dispatch(openEditBlock(true))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Components));