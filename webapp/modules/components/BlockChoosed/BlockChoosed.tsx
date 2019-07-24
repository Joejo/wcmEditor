import * as React from 'react';
import { connect } from 'react-redux';
import appPath from '../../../Utils/path';
import './BlockChoosed.css';
import {addBlock, deleteBlock, deleteModules} from "../../../Data/Actions/actions";

interface BlockChoosed {
    props: any
}

class BlockChoosed extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="blocks">
                {
                    this.props.blocks.blocks ? this.props.blocks.blocks.map((item, index) => {
                        const screenShotimg = `${appPath}/materials/components/${item.alias}/screenshot.png`;
                        return(
                            <div className="BlockChoosed" key={index}>
                                <div className="block">
                                    <div className="screenshot">
                                        <img src={screenShotimg} alt="screenshot.png"/>
                                    </div>
                                    <div className="control">
                                        <span>up </span>
                                        <span>down </span>
                                        <span onClick={() => {this.props.onDeleteBlock(index)}}>delete</span>
                                    </div>
                                    <div className="name">{item.alias}</div>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blocks: state.blocks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteBlock: (block) => {
            dispatch(deleteBlock(block));
            dispatch(deleteModules(block));
        },
        onDeleteModule: (module) => {
            dispatch(deleteModules(module))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockChoosed);