import React from 'react';
import PropTypes from 'prop-types';
import x from './img/x.png';
import { runInThisContext } from 'vm';


class Item extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      completed: false,
      num: this.props.left
      // TODO
    };
  }
  Try(){

    if (this.state.completed===false){
      this.setState({completed:true})
      this.setState({num: this.props.left-1})
      console.log(this.state.num)
    }
    if (this.state.completed===true){
      this.setState({completed:false})
      this.setState({num: this.props.left+1})
      console.log(this.state.num)
    }
    
  }
 
  render(){

  return (
  <li className="todo-app__item">
    <div className="todo-app__checkbox">
      <input id={this.props.id} type="checkbox" onClick={this.Try.bind(this)} ></input>
      <label htmlFor={this.props.id}></label>
    </div>
  <h1 className="todo-app__item-detail">{this.props.name}</h1>
  <img src={x} className="todo-app__item-x" onClick={this.props.Delete}></img>
   
  </li>
  );
};
};



export default Item;
