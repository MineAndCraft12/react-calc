import React from 'react';
import './App.css';
import CalcScreen from './CalcScreen';
import CalcControls from './CalcControls';

class App extends React.Component {
    constructor(props) {
        super(props);
        // TODO: CONSTRUCTOR
        this.state = {
            shifted: false,
            screen1: "",
            screen2: "0"
        }
    }

    addText(text) {
        this.setState({
            screen1: this.state.screen1 + text
        })
    }

    removeText() {
        var oldText = this.state.screen1;
        var newText;
        var foundChunk = false;
        for(var i in this.removableChunks) {
            console.log(oldText.substring(oldText.length - this.removableChunks[i].length));
            if(oldText.substring(oldText.length - this.removableChunks[i].length) === this.removableChunks[i]) {
                newText = oldText.substring(0, oldText.length - this.removableChunks[i].length);
                foundChunk = true;
                break;
            }
        }
        if(!foundChunk) {
            newText = oldText.substring(0, oldText.length - 1);
        }
        this.setState({
            screen1: newText
        });
    }

    removableChunks = [
        '√‾('
    ];

    // earlier evalReplacements take precedence over others
    // careful, later evalReplacements can accidentally act on the results of earlier ones
    evalReplacements = [
        ['√‾(', 'Math.sqrt('],
        ['^', '**'],
        ['×', '*']
    ];

    lastEntry = ""

    evaluate() {
        this.lastEntry = this.state.screen1;
        var input = this.state.screen1;
        console.log("INPUT: " + input);
        var tempInput = "";
        while(tempInput !== input) {
            tempInput = input;
            for(var i in this.evalReplacements) {
                var detectIndex = input.indexOf(this.evalReplacements[i][0])
                if(detectIndex > -1) {
                    input = input.substring(0, detectIndex) + this.evalReplacements[i][1] + input.substring(detectIndex + this.evalReplacements[i][0].length);
                }
            }
        }
        var finalizedInput = "NO ANSWER";
        var fixAttempts = 0;
        while(finalizedInput === "NO ANSWER" && fixAttempts < 10){
            try{
                // eslint-disable-next-line
                finalizedInput = eval(input);
            }catch(err) {
                if(err.message === "missing ) after argument list") {
                    input += ")";
                    fixAttempts++;
                }else{
                    finalizedInput = err.message;
                    fixAttempts = 15;
                }
            }
        }
        console.log("FIXED: " + input);
        if(fixAttempts !== 15){
            this.setState({
                screen1: ""
            });
        }
        this.setState({
            screen2: String(finalizedInput)
        });
    }

    actions = {
        shift: [() => {
            this.setState({
                shifted: !this.state.shifted
            });
        }],
        equals: [() => {
            this.evaluate();
        }],
        answer: [
            () => {
                this.addText(this.state.screen2);
            },
            () => {
                this.addText(this.lastEntry);
            }
        ],
        backspace: [() => {
            this.removeText();
        }],
        allClear: [() => {
            this.setState({
                screen1: "",
                screen2: "0"
            });
        }],
        clearEntry: [() => {
            this.setState({
                screen1: ""
            });
        }],
        one: [() => {
            this.addText("1");
        }],
        two: [() => {
            this.addText("2");
        }],
        three: [() => {
            this.addText("3");
        }],
        four: [() => {
            this.addText("4");
        }],
        five: [() => {
            this.addText("5");
        }],
        six: [() => {
            this.addText("6");
        }],
        seven: [() => {
            this.addText("7");
        }],
        eight: [() => {
            this.addText("8");
        }],
        nine: [() => {
            this.addText("9");
        }],
        zero: [() => {
            this.addText("0");
        }],
        period: [() => {
            this.addText(".");
        }],
        open: [
            () => {
                this.addText("(");
            },
            () => {
                this.addText("[");
            }
        ],
        close: [
            () => {
                this.addText(")");
            },
            () => {
                this.addText("]");
            }
        ],
        comma: [() => {
            this.addText(",");
        }],
        sqrt: [() => {
            this.addText("√‾(");
        }],
        multiply: [
            () => {
                this.addText("×");
            },
            () => {
                this.addText("^");
            }
        ],
        divide: [
            () => {
                this.addText("/");
            },
            () => {
                this.addText("%");
            }
        ],
        plus: [() => {
            this.addText("+");
        }],
        minus: [() => {
            this.addText("-");
        }]
    }

    handleClick(buttonID) {
        console.log("pressed " + buttonID);
        if(this.actions[buttonID]) {
            if(!this.state.shifted) {
                this.actions[buttonID][0]();
            } else {
                if(this.actions[buttonID][1]){
                    this.actions[buttonID][1]();
                }else{
                    this.actions[buttonID][0]();
                }
            }
        }
    }

    render() {
        return (
            <div className="App">
                <CalcScreen
                    shifted={this.state.shifted}
                    text1={this.state.screen1}
                    text2={this.state.screen2}
                />
                <CalcControls
                    shifted={this.state.shifted}
                    clickHandler={buttonID => this.handleClick(buttonID)}
                />
            </div>
        );
    }
}

export default App;
