import * as React from 'react';
import './Tables.css';

class Tables extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="Tables">
                <table>
                    <tbody>
                    <tr>
                        <th>Month</th>
                        <th>Savings</th>
                    </tr>
                    <tr>
                        <td>January</td>
                        <td>$100</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Tables;