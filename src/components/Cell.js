import React from 'react';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      documento: []
    }
  }
  componentDidMount(){
    this.setState({documento: this.props.data});
    console.log(this.props.data);
  }
  render(){
    return (
      <td>
        <p>{this.state.documento.documents} doc.</p>
        <p>{this.state.documento.revenue} €</p>
      </td>
    );
  }
}
export default Cell;