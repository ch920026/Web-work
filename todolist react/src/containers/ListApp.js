import React from 'react';
import ReactDOM from 'react-dom';

import Item from '../components/Item';
import x from '../components//img/x.png';
import Input from '../components/Input';
import Footer from '../components/footer';
import { isRegExp } from 'util';

let ListArray=[];
let counter=0;
let left=0;
class ListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
  }


  handleDelete (e){
    var i
    ListArray.find(function(item,index,array){ if(item.props.id===e){i=index} })
    ListArray.splice(i,1)
    this.setState({list:ListArray })

 
  }

  
  
  handleInput = e => {
    if (e.key === "Enter"&&e.target.value!=="") {
      const value = e.target.value;
      ListArray.push(<Item id={counter} name={value} Delete={this.handleDelete.bind(this,counter)}
      left={left}/>)

      e.target.value = "";
      e.target.blur();
      this.setState({list:ListArray });
      counter+=1;
      left+=1;
    }
  }
  


  render() {
    return (
      
     <div  className="todo-app__root">
            <header className="todo-app__header todo-app__title" id="title">todos</header>
            <section className="todo-app__main">
              <Input onKeyPress={this.handleInput} />
            </section>
  
            <ul className="todo-app__list" id="todo-list">
            {this.state.list}
            </ul>
          <Footer mark={left}/>
            <div className="clear"><button onClick={this.CleanAll}>delete all</button></div>
    </div>
    );
  }
}

export default ListApp;
