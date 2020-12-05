import React from 'react';
import PropTypes from 'prop-types';



class Footer extends React.Component {
 
  render(){

  return (
    <footer className="todo-app__footer" id="todo-footer">
        <div className="todot-app__total"><span id="todo-count">{this.props.mark}</span> left</div>
        <ul className="todo-app__view-buttons">
            <li> <button onClick="original()">all</button></li>
            <li> <button onClick="active()">Active</button></li>
            <li> <button onClick="done()">Completed</button></li>
        </ul>
        <div className="todo-app__clean"> <button onClick="clearComplete()">CLear Completed</button></div>
    </footer>
  );
};
};




export default Footer;
