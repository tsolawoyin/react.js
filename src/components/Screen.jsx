import "../css/Screen.css";
import { useState } from "react";

function History({ expr, answer }) {
  return (
    <div className="history">
      <p className="left">{expr}</p>
      <p>=</p>
      <p className="right">{answer}</p>
    </div>
  );
}

function Screen({ history }) {
  return (
    <div id="screen">
      <div>
        {history.reverse().map((h) => (
          <History expr={h.expr} answer={h.answer} key={h.expr} />
        ))}
      </div>
    </div>
  );
}

// the rest will just be styling

export default Screen;
