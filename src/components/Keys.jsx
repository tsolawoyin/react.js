import "../css/Keys.css";
import { evaluate } from "mathjs";
import { v4 as uuidv4 } from "uuid";

// Key ds...
let keys = [
  ["cancel", "(", ")", "%"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

function Keys({ value, setValue, history, setHistory}) {
  function handleClick(key, e) {
    if (key != "cancel" && key != "=") {
      setValue(value + key);
    } else if (key == "cancel") {
      setValue(value.slice(0, value.length - 1));
    } else if (key == "=") {
      try {
        let old = value;
        let val = evaluate(old);
        setValue(String(val));

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

  let k = keys.map((tray) => {
    //
    return tray.map((key) => {
      let className = "";
      if (key == "cancel") {
        className = "button is-danger";
      } else if (key == "=") {
        className = "button is-success";
      } else {
        className = "button";
      }
      return (
        <td
          className={className}
          key={key}
          onClick={(e) => handleClick(key, e)}
        >
          {key}
        </td>
      );
    });
  });

  return (
    <table>
      <tbody>
        {k.map((e, i) => {
          return <tr key={i}>{e.map((e) => e)}</tr>;
        })}
      </tbody>
    </table>
  );
}

export default Keys;
