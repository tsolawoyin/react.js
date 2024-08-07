import { useState } from "react";

import Screen from "./components/Screen";
import Keys from "./components/Keys";
import Input from "./components/Input";
import Header from "./components/Header";

import "./css/App.css";

function App() {
  let [value, setValue] = useState("");

  return (
    <>
      <Header />
      <Screen />
      <Input value={value} setValue={setValue}/>
      <Keys  value={value} setValue={setValue}/>
    </>
  );
}

export default App;
