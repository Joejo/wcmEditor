import * as React from 'react';
import './Table1.css';

export default function Table1(props){
    const {
        row,
        col
    } = props;
    let tableList = () => Array(Number(row)).fill(row).map(m => {
        let tds = Array(Number(col)).fill(col).map((n, i) => {
            return <td>{ n }</td>
        });
        return <tr>{ tds }</tr>
    });

    return <div className="Table1">
        <table>
            <tbody>{tableList()}</tbody>
        </table>
    </div>;
}

Table1.defaultProps = {
    row: 1,
    col: 2
}