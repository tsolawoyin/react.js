import { useState } from "react";
import "../css/Header.css";

function Header ({valHist, setValHist, setValue}) {
    // undo key...
    // what is the function of undo
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

    function handleUndo(e) {
        // added undo function rather easily.
        // thank you sir.
        if (valHist.length) {
            if (valHist.length == 1) {
                setValue(""); // empty string
                setValHist([]); // simple
            } else {
                let curr = valHist[valHist.length - 2] 
                setValue(curr)
                setValHist(valHist.slice(0, valHist.length - 1)); 
            }
        }
    }

    return (
        <div id="header">
            <p className="button is-small" onClick={handleUndo}>Undo</p>
            <p id="snicket">Snicket Calculator</p>
            <p className="button is-small" onClick={handleClick}>{lightMode}</p>
        </div>
    )
}

export default Header;