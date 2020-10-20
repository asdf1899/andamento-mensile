import React from 'react';
import Cell from '../components/Cell.js'
import data from '../data.json'

class Table extends React.Component{
  constructor(props){
    super(props);
    this.month = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.state = {
      tableData: []
    }
  }
  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
  filterData(data){
    let mesi = [];
    for (let j = 0; j < this.month.length; j++){
      mesi.push([
        this.month[j], {
          'documents': 0,
          'revenue': 0,
          'month': 0
        }
      ])
    }
    //console.log(mesi);
    //console.log(data);
    for (let i = 0; i < data.length; i++){
      let currentDate = new Date(data[i].month);
      if (this.isValidDate(currentDate)){
        let currentMonth = this.month[currentDate.getMonth()];
        mesi.map((mese) => {
          if (mese[0] === currentMonth){
            mese[1] = data[i]
          }
        })
        //console.log(mesi)
      }
    }
    return mesi;
  }
  componentDidMount(){
    this.setState({tableData: this.filterData(data)})
    console.log(this.state.tableData)
    console.log(this.filterData(data));
  }
  render(){
    //let tableHeader = this.month.map((month, i) => <th key={i}>{month}</th>);
    let tableHeader = this.state.tableData.map((month, i) => <th key={i}>{month[0]}</th>)
    let tableCell = this.state.tableData.map((month, i) => <Cell key={i} data={month[1]} />);
    return (
      <div>
        <table>
          <thead>
            <tr>
              {tableHeader}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableCell}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;