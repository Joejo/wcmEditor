import * as React from 'react';
import { connect } from 'react-redux';
import { getBlocks } from '../../../Utils';
import { addBlock } from '../../../Data/Actions/actions';
import './BlockComponent.css';
import appPath from '../../../Utils/path';

interface BlockComponent {
    props: any,
    blockLists: any
}

class BlockComponent extends React.Component{
    constructor(props){
        super(props);
        this.blockLists = getBlocks;
    }
    render(){
        return(
            <div className="blocks flex-hrz">
                {
                    this.blockLists ? this.blockLists.map((item, index) => {
                        const screenShotimg = `${appPath}/materials/components/${item.alias}/screenshot.png`;
                        return (
                            <div className="BlockComponent" title="选择模板" key={index}>
                                <section className="block">
                                    <div className="screenshop" onClick={ (e) => {this.props.onAddBlock(item, e)} }>
                                        <img src={screenShotimg} alt="screenshot.png"/>
                                    </div>
                                    <div className="info">
                                        <div className="lf">
                                            <div className="name">{item.name}</div>
                                            <div className="alias">{item.alias}</div>
                                        </div>
                                        {
                                            item.props ? (
                                                <div className="rt">
                                                    {
                                                        Object.keys(item.props).map(i => <div><span>{i}</span><input className={i} type="text" placeholder={item.props[i]} /></div>)
                                                    }
                                                </div>
                                            ) : null
                                        }
                                    </div>
                                </section>
                            </div>
                        )
                    }) : null
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddBlock: (block, e) => {
            const props = block.props;
            if(props){
                let nodeCur = e.target;
                let wrapNode = nodeCur.parentNode;
                if(nodeCur.nodeName === 'IMG'){
                    wrapNode = nodeCur.parentNode.parentNode;
                }else if(nodeCur.className === 'screenshop'){
                    wrapNode = nodeCur.parentNode;
                }else if(nodeCur.className === 'block'){
                    wrapNode = nodeCur;
                }

                const inputs = wrapNode.querySelectorAll('input');
                Object.keys(props).forEach(prop => {
                    const inputProp: any = Array.from(inputs).filter((input: any) => {
                        console.log(input, 'input');
                        if(input.className === prop){
                            return input;
                        }
                    });
                    props[prop] = inputProp[0].value;
                });
            }

            dispatch(addBlock(block));
        }
    }
}


export default connect(null, mapDispatchToProps)(BlockComponent);