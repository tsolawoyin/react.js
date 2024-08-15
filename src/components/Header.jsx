import { useState } from 'react';
import { v4 as randomID } from 'uuid';

import '../css/Header.css';

let tabList = [
    {
        isActive: false,
        title: "Yummy resume",
        key: randomID()
    },
    {
        isActive: true,
        title: "Bournvita resume",
        key: randomID()
    },
    {
        isActive: false,
        title: "Nunu resume",
        key: randomID()
    },
    {
        isActive: false,
        title: "Titus resume",
        key: randomID()
    },
    {
        isActive: false,
        title: "Chivita resume",
        key: randomID()
    },
]

function Header () {
    // tomorrow we useImmer.
    let [tabs, setTabs] = useState(tabList);
    // we need to update this stuff
    function handleClick( e ) {
        let id = e.target.id;

        setTabs(tabs.map(tab => {
            // turn off any existing one
            if (tab.isActive) {
                return {...tab, isActive: false};
            }
            // then check others...
            if (tab.key == id) {
                return {...tab, isActive: true}
            } else {
                return tab;
            }
        }))
        
    }
    let resumes = tabs.map(e => {
        return (
            <li key={e.key} onClick={handleClick} >
                <span className={e.isActive ? "tab-name active" : "tab-name"} id={e.key}>{e.title}</span>
                <span className='delete is-medium'></span>
            </li>
        )
    })
    return (
        <header className='p-2' id='header'>
            <div id="logo">CV</div>
            <ul id="tabs">
                {resumes}
            </ul>
            <button className='button is-small'>Dark</button>
        </header>
    )
}

export default Header