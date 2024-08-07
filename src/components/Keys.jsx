import "../css/Keys.css";

// Key ds...
let keys = [
  ["cancel", "(", ")", "mod"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

function Keys({ value, setValue }) {
  function handleClick(key, e) {
    if (key != "cancel" && key != "=") {
        setValue(value + key);
    } else if (key == "cancel") {
        setValue(value.slice(0, value.length - 1));
    } else {
        // finding the answer and updating appropriately...
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
