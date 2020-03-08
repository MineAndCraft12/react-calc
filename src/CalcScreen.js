import React from 'react';
import './CalcScreen.css';

class CalcScreen extends React.Component {
    /*
        props:

        shifted
        text1
        text2
    */
    constructor(props){
        super(props);
        this.state = {
            statusText: ""
        };
        if(props.shifted){
            this.state.statusText = "2nd";
        }
    }

    render() {
        return (
            <div className="CalcScreen">
                <div className="CalcText1">{this.props.text1}</div>
                <div className="CalcText2">{this.props.text2}</div>
                <div className="CalcStatus">{this.state.statusText}</div>
            </div>
        );
    }
}

export default CalcScreen;