import "../css/Input.css";

function Input({value, setValue}) {
  return (
    <input
      type="text"
      className="input"
      id="input-field"
      onInput={e => setValue(e.target.value)}
      value={value}
      placeholder="powered by mathjs"
    />
  );
}

export default Input;
