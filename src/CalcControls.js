import React from 'react';
import './CalcControls.css';
import CalcButton from './CalcButton';

class CalcControls extends React.Component {
    /*
        props:

        clickHandler
    */

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderCalcButton(primaryText, secondaryText, buttonID) {
        var text1;
        var text2;
        if(primaryText === secondaryText){
            text1 = primaryText;
            text2 = "";
        }else if(!this.props.shifted){
            text1 = primaryText;
            text2 = secondaryText;
        }else{
            text1 = secondaryText;
            text2 = primaryText;
        }

        return (
            <CalcButton
                buttonID={buttonID}
                onClick={() => this.props.clickHandler(buttonID)}
                text1={text1}
                text2={text2}
            />
        );
    }

    render() {
        return (
            <div className="CalcControls">
                <div className="ButtonRow">
                    {this.renderCalcButton("(", "[", "open")}
                    {this.renderCalcButton(",", ",", "comma")}
                    {this.renderCalcButton(")", "]", "close")}
                    {this.renderCalcButton("√‾", "√‾", "sqrt")}
                    {this.renderCalcButton("AC", "AC", "allClear")}
                </div>
                <div className="ButtonRow">
                    {this.renderCalcButton("7", "7", "seven")}
                    {this.renderCalcButton("8", "8", "eight")}
                    {this.renderCalcButton("9", "9", "nine")}
                    {this.renderCalcButton("DEL", "DEL", "backspace")}
                    {this.renderCalcButton("CE", "CE", "clearEntry")}
                </div>
                <div className="ButtonRow">
                    {this.renderCalcButton("4", "4", "four")}
                    {this.renderCalcButton("5", "5", "five")}
                    {this.renderCalcButton("6", "6", "six")}
                    {this.renderCalcButton("×", "^", "multiply")}
                    {this.renderCalcButton("÷", "%", "divide")}
                </div>
                <div className="ButtonRow">
                    {this.renderCalcButton("1", "1", "one")}
                    {this.renderCalcButton("2", "2", "two")}
                    {this.renderCalcButton("3", "3", "three")}
                    {this.renderCalcButton("+", "+", "plus")}
                    {this.renderCalcButton("-", "-", "minus")}
                </div>
                <div className="ButtonRow">
                    {this.renderCalcButton("", "2nd", "shift")}
                    {this.renderCalcButton("0", "0", "zero")}
                    {this.renderCalcButton(".", ".", "period")}
                    {this.renderCalcButton("Ans", "Entry", "answer")}
                    {this.renderCalcButton("=", "=", "equals")}
                </div>
            </div>
        );
    }
}

export default CalcControls;