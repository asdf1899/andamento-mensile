import React from 'react';
import moment from 'moment';
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
    let revenue = 0;
    // scorro l'array coi mesi
    this.month.forEach((currentMonth, monthIndex)=>{
      let documents = {documents: 0, revenue: 0, month: 0};
      // currentMonth contiene il mese iniziale es. "Gennaio", "Febbraio" ecc.
      for (let i=0; i< data.length; i++){
        // currentData es. "{"documents": 2,"revenue": 29000, "month": "2019/05"}"
        let currentData = data[i];
        // divido la string in anno e mese
        let splitMonth = currentData.month.split('/');
        // con parseInt toglie i leading 0 es. 010 
        let year = parseInt(splitMonth[0]);
        let month = parseInt(splitMonth[1]);
        // se il mese è minore di 10, moment richiede che i mesi inferiori a 10 abbiano lo 0 davanti es. 09
        month = (month < 10) ? '0'+month : month;
        let newDate = moment(year+ '-' + month, "YYYY-MM", true);
        // controllo se la data è valida
        if (newDate.isValid()){
          // month restituisce l'index month della data (0-11)
          let newDateMonthIndex = newDate.month();
          // se l'index del mese attuale (index di "Gennaio") è uguale all'index di currentData
          // allora controllo se ha il fatturato maggiore degli altri ed assegno a documents currentData
          if (monthIndex === newDateMonthIndex){
            revenue = (currentData.revenue >= revenue) ? data[monthIndex].revenue : revenue; 
            documents = currentData;
            break;
          }
        }
      }
      mesi.push([currentMonth, documents]);
    });
    this.setState({maxRevenue: revenue})
    return mesi;
  }
  componentDidMount(){
    this.setState({tableData: this.filterData(this.props.data)});
  }
  render(){
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