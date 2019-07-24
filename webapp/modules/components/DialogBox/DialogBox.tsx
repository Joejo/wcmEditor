import * as React from 'react';
import './DialogBox.css';

interface DialogBox {
    props: any
}

class DialogBox extends React.Component{
    constructor(props){
        super();
    }

    render(){
        const {
            data,
            children
        } = this.props;

        return(
            <section className="DialogBox">
                <div className="title">{data.title}</div>
                <div className="box">
                    {children}
                </div>
            </section>
        );
    }
}

export default DialogBox;