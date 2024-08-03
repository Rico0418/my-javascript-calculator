import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [operation, setOperation] = useState("");
  const [resetInput, setResetInput] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setInput("0");
    setOperation("");
    setResetInput(false);
    setEvaluated(false);
  };

  const handleNumber = (num) => {
    if (resetInput || input === "0" || evaluated) {
      setInput(num);
      setResetInput(false);
      setEvaluated(false);
    } else {
      setInput(input + num);
    }

    if (evaluated) {
      setOperation(num);
    } else {
      setOperation((prev) => prev + num);
    }
  };

  const handleOperator = (op) => {
    if (evaluated) {
      setOperation(input + " " + op + " ");
      setInput(op);
      setEvaluated(false);
    } else if (operation && isNaN(operation.slice(-1))) {
      // If the last character in operation is not a number
      if (op === "-" && operation.slice(-1) !== "-") {
        setOperation((prev) => prev + " " + op + " ");
      } else {
        setOperation((prev) => prev.slice(0, -3) + " " + op + " ");
      }
    } else {
      setOperation((prev) => prev + " " + op + " ");
    }
    setInput(op);
    setResetInput(true);
  };

  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setOperation((prev) => prev + ".");
    } else if (resetInput || evaluated) {
      setInput("0.");
      setOperation("0.");
      setResetInput(false);
      setEvaluated(false);
    }
  };

  const handleEquals = () => {
    if (operation && !evaluated) {
      const result = calculate(operation);
      setInput(result.toString());
      setOperation(result.toString());
      setResetInput(true);
      setEvaluated(true);
    }
  };

  const calculate = (op) => {
    try {
      // Handle negative numbers and strip spaces for eval
      const expression = op.replace(/ /g, "").replace("--", "+");
      // eslint-disable-next-line no-eval
      return parseFloat(eval(expression).toFixed(4));
    } catch {
      return "=NAN";
    }
  };

  return (
    <div id="calculator" className="calculator">
      <div id="operation" className="operation">
        {operation}
      </div>
      <div id="display" className="display">
        {input}
      </div>
      <div className="keypad">
        <button id="clear" onClick={handleClear}>
          AC
        </button>
        <button
          id="divide"
          style={{ backgroundColor: "rgb(102, 102, 102)" }}
          onClick={() => handleOperator("/")}
        >
          /
        </button>
        <button
          id="multiply"
          style={{ backgroundColor: "rgb(102, 102, 102)" }}
          onClick={() => handleOperator("*")}
        >
          X
        </button>
        <button id="seven" onClick={() => handleNumber("7")}>
          7
        </button>
        <button id="eight" onClick={() => handleNumber("8")}>
          8
        </button>
        <button id="nine" onClick={() => handleNumber("9")}>
          9
        </button>
        <button
          id="subtract"
          style={{ backgroundColor: "rgb(102, 102, 102)" }}
          onClick={() => handleOperator("-")}
        >
          -
        </button>
        <button id="four" onClick={() => handleNumber("4")}>
          4
        </button>
        <button id="five" onClick={() => handleNumber("5")}>
          5
        </button>
        <button id="six" onClick={() => handleNumber("6")}>
          6
        </button>
        <button
          id="add"
          style={{ backgroundColor: "rgb(102, 102, 102)" }}
          onClick={() => handleOperator("+")}
        >
          +
        </button>
        <button id="one" onClick={() => handleNumber("1")}>
          1
        </button>
        <button id="two" onClick={() => handleNumber("2")}>
          2
        </button>
        <button id="three" onClick={() => handleNumber("3")}>
          3
        </button>
        <button id="equals" onClick={handleEquals}>
          =
        </button>
        <button id="zero" onClick={() => handleNumber("0")}>
          0
        </button>
        <button id="decimal" onClick={handleDecimal}>
          .
        </button>
      </div>
    </div>
  );
};

export default Calculator;
