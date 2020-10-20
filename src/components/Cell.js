import React from 'react';
import '../App.css';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      documento: [],
      backgroundHeight: 0,
      selected: false
    }
  }
  componentDidMount(){
    this.setState({documento: this.props.data, backgroundHeight: this.getBgValue()});
  }
  getBgValue(){
    return Math.abs((((this.props.data.revenue * 100) / this.props.maxRevenue) - 100));
  }
  handleSelection(){
    console.log(this.state.selected);
    this.setState({selected: !this.state.selected})
  }
  render(){
    return (
      <td className="border px-2 py-2 style-td" 
          style={{
            'backgroundImage': 'linear-gradient(white '+this.state.backgroundHeight+'%, rgba(144, 237, 54, 0.30) '+this.state.backgroundHeight+'%)', 
            'borderBottom': (this.state.selected ? '3px solid #7ED321' : 'none') 
          }}
          onClick={() => this.handleSelection()}
      >
        <p className="text-gray-600 text-sm mt-8">{this.state.documento.documents} doc.</p>
        <p className="text-blue-600 text-md">{this.state.documento.revenue} €</p>
      </td>
    );
  }
}
export default Cell;