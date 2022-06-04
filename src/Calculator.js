import React from "react";
import "./calculator.css";
// Components
import CalculatorDisplay from "./CalculatorDisplay";

class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props;

    return (
      <section onClick={onPress}>
        <button className={`calculator-key ${className}`} {...props} />
      </section>
    );
  }
}

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: "0",
    waitingForOperand: false,
    operator: null,
  };

  clearDisplay() {
    this.setState({
      displayValue: "0",
      value: null,
    });
  }
  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue:
          displayValue === "0" ? String(digit) : displayValue + digit,
      });
    }
  }
  inputDot() {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: ".",
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf(".") === -1) {
      this.setState({
        displayValue: displayValue + ".",
        waitingForOperand: false,
      });
    }
  }
  toggleSign() {
    const { displayValue } = this.state;
    this.setState({
      displayValue:
        displayValue.charAt(0) === "-"
          ? displayValue.substr(1)
          : "-" + displayValue,
    });
  }
  inputPercent() {
    const { displayValue } = this.state;
    const value = parseFloat(displayValue);

    this.setState({
      displayValue: String(value / 100),
    });
  }
  performOperation(nextOperator) {
    const { displayValue, operator, value } = this.state;

    const nextValue = parseFloat(displayValue);

    const operations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue,
    };

    if (value == null) {
      this.setState({
        value: nextValue,
      });
    } else if (operator) {
      const currentValue = value || 0;
      const computedValue = operations[operator](currentValue, nextValue);

      this.setState({
        value: computedValue,
        displayValue: String(computedValue),
      });
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator,
    });
  }

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <CalculatorDisplay value={displayValue} />
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <CalculatorKey
                className="key-clear"
                onPress={() => this.clearDisplay()}
              >
                AC
              </CalculatorKey>
              <CalculatorKey
                className="key-sign"
                onPress={() => this.toggleSign()}
              >
                ±
              </CalculatorKey>
              <CalculatorKey
                className="key-percent"
                onPress={() => this.inputPercent()}
              >
                %
              </CalculatorKey>
            </div>
            <div className="digit-keys">
              <CalculatorKey
                className="key-0"
                onPress={() => this.inputDigit(0)}
              >
                0
              </CalculatorKey>
              <CalculatorKey
                className="key-dot"
                onPress={() => this.inputDot()}
              >
                ●
              </CalculatorKey>
              <CalculatorKey
                className="key-1"
                onPress={() => this.inputDigit(1)}
              >
                1
              </CalculatorKey>
              <CalculatorKey
                className="key-2"
                onPress={() => this.inputDigit(2)}
              >
                2
              </CalculatorKey>
              <CalculatorKey
                className="key-3"
                onPress={() => this.inputDigit(3)}
              >
                3
              </CalculatorKey>
              <CalculatorKey
                className="key-4"
                onPress={() => this.inputDigit(4)}
              >
                4
              </CalculatorKey>
              <CalculatorKey
                className="key-5"
                onPress={() => this.inputDigit(5)}
              >
                5
              </CalculatorKey>
              <CalculatorKey
                className="key-6"
                onPress={() => this.inputDigit(6)}
              >
                6
              </CalculatorKey>
              <CalculatorKey
                className="key-7"
                onPress={() => this.inputDigit(7)}
              >
                7
              </CalculatorKey>
              <CalculatorKey
                className="key-8"
                onPress={() => this.inputDigit(8)}
              >
                8
              </CalculatorKey>
              <CalculatorKey
                className="key-9"
                onPress={() => this.inputDigit(9)}
              >
                9
              </CalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey
              className="key-divide"
              onPress={() => this.performOperation("/")}
            >
              ÷
            </CalculatorKey>
            <CalculatorKey
              className="key-multiply"
              onPress={() => this.performOperation("*")}
            >
              ×
            </CalculatorKey>
            <CalculatorKey
              className="key-subtract"
              onPress={() => this.performOperation("-")}
            >
              −
            </CalculatorKey>
            <CalculatorKey
              className="key-add"
              onPress={() => this.performOperation("+")}
            >
              +
            </CalculatorKey>
            <CalculatorKey
              className="key-equals"
              onPress={() => this.performOperation("=")}
            >
              =
            </CalculatorKey>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
