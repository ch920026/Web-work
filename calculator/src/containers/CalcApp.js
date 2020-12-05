import React from 'react';
import CalcButton from '../components/CalcButton';


let holding=0;
let control=1
let Operator=1;
let Ans=0;
let div=1;
let Input=0;

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current:0,
      finish: false,
    };
  }

    resetState = () => {this.setState(state => ({ current: 0}));
    holding=0;
    Operator=1;
    Ans=0;
    div=1
    Input=0;
  }

    handelNum (e){
      let newNum
      newNum=(this.state.current)*10*control + e
      this.setState({
        current: newNum})
      this.setState({finish:false})
      control=1;
      Input=1
    }

    handelPlus(){
      holding=this.state.current 
      if (Input===1){
      Ans+=Math.pow(holding,div)*Operator
      this.setState({current:Ans})
      Input=0;
    }
      Operator=1;
      control=0
      div=1;
    }

    handelMinus(){
      holding=this.state.current
      if (Input===1){
        Ans+=Math.pow(holding,div)*Operator
        this.setState({current:Ans})
        Input=0;
      }
      Operator=-1;
      control=0
      div=1;
    }

    handelTime(){
      if (Input===1){
        Input=0;
      }
      Operator*=Math.pow(this.state.current,div)
      Operator=Math.abs(Operator)
      this.setState({current:Math.abs(Operator)})
      div=1
      holding=0;
      control=0
    }

    handelDivision(){
      if (Input===1){
        Input=0;
      }
      Operator*=Math.pow(this.state.current,div)
      Operator=Math.abs(Operator)
      this.setState({current:Math.abs(Operator)})
      div=-1
       holding=0;
      control=0
    }

    handelAns(){
      let a=this.state.current
      Ans+=(Math.pow(a,div)*Operator);
      this.setState({current:Ans})
      this.setState({finish:true})
      control=0;
      holding=0;
      Operator=1;
      Ans=0;
      div=1;
    }

    showNotImplemented() {
        console.log("no function sorry")
    }

    handelPosNeg(){
      let temp=-this.state.current
      this.setState({current:temp})

    }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.current}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState}>AC</CalcButton>
            <CalcButton onClick={this.handelPosNeg.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handelDivision.bind(this)}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,7)} children={"7"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,8)} children={"8"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,9)} children={"9"}></CalcButton>
            <CalcButton className="calc-operator" onClick={this.handelTime.bind(this)}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,4)} children={"4"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,5)} children={"5"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,6)} children={"6"}></CalcButton>
            <CalcButton className="calc-operator" onClick={this.handelMinus.bind(this)}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,1)} children={"1"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,2)} children={"2"}></CalcButton>
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,3)} children={"3"}></CalcButton>
            <CalcButton className="calc-operator" onClick={this.handelPlus.bind(this)}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.handelNum.bind(this,0)} className="bigger-btn">0</CalcButton>
            <CalcButton className="calc-number" onClick={this.showNotImplemented}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.handelAns.bind(this)}>=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
