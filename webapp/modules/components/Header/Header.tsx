import * as React from 'react';
import './Header.css';

export default function Header(props){
    const {
        title,
        arrow,
        callback
    } = props.data;

    return(
        <div className="Header">
            <div className="title" onClick={callback ? callback : () => {}}>
                <span>{title} {arrow ? <i className="arrow-bottom"></i> : null}</span>
            </div>
        </div>
    );
}