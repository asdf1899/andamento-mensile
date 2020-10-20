import React from 'react';
import Cell from '../components/Cell.js'
import data from '../data.json'

class Table extends React.Component{
  constructor(props){
    super(props);
    this.month = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.state = {
      tableData: [],
      maxRevenue: 0
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
    let revenue = 0;
    for (let i = 0; i < data.length; i++){
      let currentDate = new Date(data[i].month);
      if (this.isValidDate(currentDate)){
        let currentMonth = this.month[currentDate.getMonth()];
        revenue = (data[i].revenue >= revenue) ? data[i].revenue : revenue; 
        mesi.map((mese) => {
          if (mese[0] === currentMonth){
            mese[1] = data[i]
          }
        })
        //console.log(mesi)
      }
    }
    this.setState({maxRevenue: revenue})
    return mesi;
  }
  componentDidMount(){
    this.setState({tableData: this.filterData(data)})
  }
  render(){
    console.log(this.state.tableData);
    
    let tableHeader = this.state.tableData.map((month, i) => 
      <th key={i} className="px-2 py-2 text-left text-gray-800 text-base font-normal">{month[0]}</th>
    );
    let tableCell = this.state.tableData.map((month, i) => 
      <Cell key={i} className="text-blue-500 text-sm" data={month[1]} maxRevenue={this.state.maxRevenue} />
    );
    return (
      <div>
        <table className="table-fixed">
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