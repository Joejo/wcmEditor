import * as React from 'react';
import { withRouter } from 'react-router-dom';
import './BlockBox.css';

interface BlockBox {
    props: any
}

class BlockBox extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {
            data,
            children,
            history
        } = this.props;

        const {
            title,
            subTitle,
            actions
        } = data;

        return(
            <div className="BlockBox">
                <div className="box">
                    <div className="headline">
                        <span>{title}</span>
                        {subTitle ? <i>{subTitle}</i> : null}
                        <div className="actions">
                            <a onClick={() => { history.push('/modules') }}>添加</a>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        )
    };
}

export default withRouter(BlockBox);