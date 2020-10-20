import React from 'react';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      documento: [],
      backgroundHeight: 0
    }
  }
  componentDidMount(){
    this.setState({documento: this.props.data, backgroundHeight: this.getBgValue()});
    console.log(this.props.data);
  }
  getBgValue(){
    return Math.abs((((this.props.data.revenue * 100) / this.props.maxRevenue) - 100));
  }
  render(){
    return (
      <td className="border px-2 py-2" 
          style={{'backgroundImage': 'linear-gradient(white '+this.state.backgroundHeight+'%, rgba(144, 237, 54, 0.30) '+this.state.backgroundHeight+'%)'}}
      >
        <p className="text-gray-600 text-sm mt-8">{this.state.documento.documents} doc.</p>
        <p className="text-blue-600 text-md">{this.state.documento.revenue} €</p>
      </td>
    );
  }
}
export default Cell;