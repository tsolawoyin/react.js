import { useState } from "react";
import Expression from "./Evaluator";

import Screen from "./components/Screen";
import Keys from "./components/Keys";
import Input from "./components/Input";
import Header from "./components/Header";

import "./css/App.css";

function calculate(expr) {
  return new Expression(expr);
}

function App() {
  let [value, setValue] = useState("");
  let [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  function handleKeyDown(e) {
    if (e.key == "Enter" || e.keyCode === 13) {
      if (value) {
        try {
          let exprObj = calculate(value);
          let val = exprObj.value;

          setValue(String(val));

          let newHist = history.concat([
            {
              expr: exprObj.exprString,
              answer: val,
            },
          ]);

          setHistory(newHist);
          // set it to local storage... additional
          localStorage.setItem("history", JSON.stringify(newHist));
        } catch (err) {
          console.log("wrong");
        }
      }
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <Header />
      <Screen history={history} />
      <Input value={value} setValue={setValue} />
      <Keys
        value={value}
        setValue={setValue}
        history={history}
        setHistory={setHistory}
        calculate={calculate}
      />
    </div>
  );
}

export default App;

// as a bonus, let's set it to local storage

// let's work on undo and history to learn about the stuff
// and learn how to work with local storage...
// local storage problem solved.
// the next thing is id...
