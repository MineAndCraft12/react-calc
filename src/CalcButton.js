import React from 'react';
import './CalcButton.css';

class CalcButton extends React.Component {
    /*
        props:
        
        onClick
        buttonID
        text1
        text2
    */
    render() {
        return (
            <div className="CalcButton"
                onClick={() => this.props.onClick(this.props.buttonID)}
            >
                <div className="ButtonText1">{this.props.text1}</div>
                <div className="ButtonText2">{this.props.text2}</div>
            </div>
        );
    }
}

export default CalcButton;