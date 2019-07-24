import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../Data/Store/Store';
import SideBar from '../SideBar/SideBar';
import Body from '../webPages/Body/Body';
import Program from '../webPages/Program/Program';
import Setting from '../webPages/Setting/Setting';
import Help from '../webPages/Help/Help';
import Components from '../webPages/Components/Components';
import './RouterApp.css';

export default class RouterApp extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Provider store={store}>
                <Router>
                    <div className="wrap flex-hrz">
                        <SideBar/>
                        <div className="content flex-full">
                            <Switch>
                                <Route exact path='/' component={Program}></Route>
                                <Route exact path='/modules' component={Components}></Route>
                                <Route exact path='/setting' component={Setting}></Route>
                                <Route exact path='/help' component={Help}></Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}