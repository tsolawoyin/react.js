import { useState } from "react";
import { evaluate } from "mathjs";
import { v4 as uuidv4 } from "uuid";

import Screen from "./components/Screen";
import Keys from "./components/Keys";
import Input from "./components/Input";
import Header from "./components/Header";

import "./css/App.css";

function App() {
  let [value, setValue] = useState("");
  let [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  let [manageHistory, setManageHistory] = useState(false);
  let [valHist, setValHist] = useState([]); // always empty for new instances...

  function handleKeyDown(e) {
    if (e.key == "Enter" || e.keyCode === 13) {
      if (value) {
        try {
          // so if user doesn't input something very odd, it should work.
          let old = value;

          let val = evaluate(old);

          setValue(String(val));
          setValHist([...valHist].concat(String(val))); // hmmm. rough patch... just to make things work.

          let newHist = history.concat([
            {
              expr: old,
              answer: val,
              id: uuidv4(),
            },
          ]);

          setHistory(newHist);
          // set it to local storage... additional
          localStorage.setItem("history", JSON.stringify(newHist));
        } catch (_) {}
      }
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <Header valHist={valHist} setValHist={setValHist} setValue={setValue} />
      <Screen
        history={history}
        id="screen"
        setValue={setValue}
        valHist={valHist}
        setValHist={setValHist}
      />
      <Input
        value={value}
        setValue={setValue}
        valHist={valHist}
        setValHist={setValHist}
      />
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
        valHist={valHist}
        setValHist={setValHist}
      />
      {manageHistory ? (
        <Screen
          history={history}
          setHistory={setHistory}
          id="manage-history"
          setManageHistory={setManageHistory}
        />
      ) : null}
      <p className="is-size-7">
        Made with <a href="https://react.dev/">react</a> and{" "}
        <a href="https://bulma.io/">bulma</a>.
        <a href="https://github.com/tsolawoyin/react-projects/tree/calculator">
          {" "}
          Github
        </a>
        .<a href="https://github.com/tsolawoyin"> tsolawoyin</a>
      </p>
    </div>
  );
}

export default App;
