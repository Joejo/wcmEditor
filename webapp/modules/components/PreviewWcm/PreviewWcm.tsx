import * as React from 'react';
import './PreviewWcm.css';

interface PreviewWcm {
    state: any,
    props: any,
    refs: any
}

class PreviewWcm extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        const {
            fileContent,
            canclePreviewing,
        } = this.props.data;

        return(
            <div className="PreviewWcm">
                <div className="mask"></div>
                <div className="previewWrap">
                    <div className="previewBox">
                        <section ref="previewArea" className="previewArea" dangerouslySetInnerHTML={{__html: fileContent}}>
                        </section>
                    </div>
                    <div className="button">
                        <button className="cancle">
                            <span onClick={canclePreviewing}>关闭</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PreviewWcm;