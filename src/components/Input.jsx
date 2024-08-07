import { useState } from "react";
import Expression from "../Evaluator";
import "../css/Input.css";

function Input({value, setValue}) {

  function handleKeyDown(e) {
    let expr = e.target.value;
    if (e.key == "Enter" || e.keyCode === 13) {
      try {
        let exprObj = new Expression(expr);
        setValue(exprObj.value);
      } catch (err) {
        alert("Invalid expression");
      }
    }
  }

  return (
    <input
      type="text"
      className="input"
      id="input-field"
      onKeyDown={handleKeyDown}
      onInput={e => setValue(e.target.value)}
      value={value}
      placeholder="(3 + 4 ) / ( 3 + 6) * (7 - 5 ) * ( 2 * 2 ) + ( 1 + 1 )"
    />
  );
}

export default Input;
