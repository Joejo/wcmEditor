import * as React from 'react';
import './Body.css';

export default class Body extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="Body">
                I'm Body!
            </div>
        );
    }
}