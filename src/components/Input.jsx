import "../css/Input.css";

function Input({value, setValue}) {
  return (
    <input
      type="text"
      className="input"
      id="input-field"
      onInput={e => setValue(e.target.value)}
      value={value}
      placeholder="(3 + 4 ) / ( 3 + 6) * (7 - 5 ) * ( 2 * 2 ) + ( 1 + 1 )"
    />
  );
}

export default Input;
