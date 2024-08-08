import { useState } from "react";
import Expression from "./Evaluator";
import { v4 as uuidv4 } from "uuid";

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
  let [manageHistory, setManageHistory] = useState(false);

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
              id: uuidv4(),
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
      <Screen history={history} id="screen" setValue={setValue} />
      <Input value={value} setValue={setValue} />
      <p
        className="is-size-7"
        style={{ textAlign: "right", cursor: "pointer" }}
        onClick={(e) => setManageHistory(true)}
      >
        manage history
      </p>
      <Keys
        value={value}
        setValue={setValue}
        history={history}
        setHistory={setHistory}
        calculate={calculate}
      />
      {manageHistory ? (
        <Screen
          history={history}
          setHistory={setHistory}
          id="manage-history"
          setManageHistory={setManageHistory}
        />
      ) : null}
      <p>
        Made with <a href="https://react.dev/">react</a> and <a href="https://bulma.io/">bulma</a>
      </p>
    </div>
  );
}

export default App;
