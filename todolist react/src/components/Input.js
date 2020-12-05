import React from 'react';
export default ({onKeyPress}) => {
  return <input 
  className="todo-app__input" 
  type="text" 
  id="todo-input" 
  placeholder="Here's the thing to be done" 
  onKeyPress={onKeyPress}
  />
}