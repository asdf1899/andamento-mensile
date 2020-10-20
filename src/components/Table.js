import React from 'react';
import Cell from '../components/Cell.js'

class Table extends React.Component{
  constructor(props){
    super(props);
    this.month = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    this.state = {
      tableData: [],
      maxRevenue: 0,
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
      }
    }
    this.setState({maxRevenue: revenue})
    return mesi;
  }
  componentDidMount(){
    this.setState({tableData: this.filterData(this.props.data)});
  }
  render(){
    console.log(this.state.tableData);
    
    let tableHeader = this.state.tableData.map((month, i) => 
      <th key={i} className="pl-1 pr-6 py-2 text-gray-800 text-base font-normal">{month[0]}</th>
    );
    let tableCell = this.state.tableData.map((month, i) => 
      <Cell key={i} className="text-blue-500 text-left text-sm" data={month[1]} maxRevenue={this.state.maxRevenue} />
    );
    return (
      <div className="py-4 px-2 w-full" style={{'overflowX': 'auto'}}>
        <table className="table-fixed">
          <thead className="p-0 m-0">
            <tr className="text-left">
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