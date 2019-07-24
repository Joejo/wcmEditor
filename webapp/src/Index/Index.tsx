import * as React from 'react';
import {
    SideBar,
    Body,
} from '../../modules';
import './Index.css';

export default class Index extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Wrap">
                <SideBar />
                <Body />
            </div>
        );
    }
}