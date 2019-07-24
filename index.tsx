import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RouterApp from './webapp/modules/RouterApp/RouterApp';
import './webapp/styles/reset.css';
import './webapp/styles/common.css';

const App = function (){
    return(
        <RouterApp />
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('App')
);