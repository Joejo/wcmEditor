import * as React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default class SideBar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="SideBar">
                <ul>
                    <li>
                        <Link to='/'>项目</Link>
                    </li>
                    <li>
                        <Link to='/modules'>模板</Link>
                    </li>
                    <li>
                        <Link to='/setting'>设置</Link>
                    </li>
                </ul>
                <div className="help">
                    <Link to='/help'>帮助</Link>
                </div>
            </div>
        );
    }
}