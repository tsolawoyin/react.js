import { useState } from "react";
import "../css/Header.css";

function Header () {
    let [lightMode, setLightMode] = useState("Dark");

    function handleClick () {
        if (lightMode == "Dark") {
            document.documentElement.setAttribute("data-theme", "light")
            setLightMode("Light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark")
            setLightMode("Dark");
        }
    }

    return (
        <div id="header">
            <p className="button is-small">Undo</p>
            <p id="snicket">Snicket Calculator</p>
            <p className="button is-small" onClick={handleClick}>{lightMode}</p>
        </div>
    )
}

export default Header;