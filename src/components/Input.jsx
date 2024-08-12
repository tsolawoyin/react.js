import "../css/Input.css";

function Input({value, setValue, valHist, setValHist}) {
  return (
    <input
      type="text"
      className="input"
      id="input-field"
      onInput={e => {
        setValue(e.target.value)
        setValHist(valHist.concat(e.target.value));
      }}
      value={value}
      placeholder="powered by mathjs"
    />
  );
}

export default Input;
