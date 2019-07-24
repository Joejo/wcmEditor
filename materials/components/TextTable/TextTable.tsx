import * as React from 'react';
import './TextTable.css';

export default function TextTable(props) {
  const {
    row,
    col,
  } = props;

  let tabTitle = [];
  let tabCont = [];
  for( let i = 0 ; i < col; i++){
    tabTitle.push(<th>{i}</th>);
  }

  for( let i = 0 ; i < row; i++) {
    let cont = [];
    for (let j = 0; j < col; j++){
      cont.push(<td>{j}</td>);
    }
    tabCont.push(<tr>{cont}</tr>);
  }

  return <div className="textTable">
    <table>
      <tbody>
        <tr>{tabTitle}</tr>
        {tabCont}
      </tbody>
    </table>
  </div>;
}

TextTable.defaultProps = {
  row: 1,
  col: 2
}
