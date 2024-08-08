import "../css/Screen.css";

function History({ expr, answer, setValue, id, from, history, setHistory }) {
  function handleClick(e) {
    setValue(e.target.textContent);
  }

  function deleteHistory(e) {
    if (e.target.classList.contains("fa-xmark")) {
      let id = e.target.id;
      let newHist = [...history]; // copy old history]
      newHist = newHist.filter((e) => e.id != id);
      setHistory(newHist);

      localStorage.setItem("history", JSON.stringify(newHist));
    }
  }

  return (
    <div
      className="history"
      style={{
        display: "grid",
        gridTemplateColumns: `${
          from == "manage-history" ? "repeat(4, 1fr)" : "repeat(3, 1fr)"
        }`,
        marginTop: "1em",
      }}
      onClick={deleteHistory}
    >
      <p className="left" onClick={handleClick}>
        {expr}
      </p>
      <p>=</p>
      <p className="right" onClick={handleClick}>
        {answer}
      </p>
      {from == "manage-history" ? (
        <span className="icon has-text-danger" style={{ justifySelf: "right" }}>
          <i className="fa-solid fa-xmark" id={id}></i>
        </span>
      ) : null}
    </div>
  );
}

function Screen({ history, setHistory, setValue, id, setManageHistory }) {
  // let it be like that for now jare...
  return (
    <div id={id} className={id == "manage-history" ? "box" : ""}>
      {id == "manage-history" ? (
        <p className="button" onClick={(e) => setManageHistory(false)}>
          Close
        </p>
      ) : null}
      <div>
        {history.map((h) => (
          <History
            expr={h.expr}
            answer={h.answer}
            setValue={setValue}
            key={h.id}
            id={h.id}
            from={id}
            history={history}
            setHistory={setHistory}
          />
        ))}
      </div>
    </div>
  );
}

export default Screen;
