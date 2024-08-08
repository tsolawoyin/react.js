import { useState } from "react";
import "../css/Header.css";

function Header () {
    let [lightMode, setLightMode] = useState(localStorage.getItem("lightmode") || "Dark");

    if (lightMode == "Dark") {
        document.documentElement.setAttribute("data-theme", "dark")
    } else {
        document.documentElement.setAttribute("data-theme", "light")
    }

    function handleClick () {
        if (lightMode == "Dark") {
            setLightMode("Light");
            localStorage.setItem("lightmode", "Light")
        } else {
            setLightMode("Dark");
            localStorage.setItem("lightmode", "Dark")
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