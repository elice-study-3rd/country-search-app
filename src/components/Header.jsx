import React from "react";
import "../styles/Header.css";

const Header = (props) => {
    const toggle = document.querySelector(".toggle");
    const icon = document.querySelector(".bx");

    // toggle.addEventListener("click", (e) => {
    //     document.header.classList.toggle("dark-mode");
    //     // 추가 작업 필요한 자리
    //     icon.classList.toggle("bxs-moon");
    // });

    return (
        <header className={"header" + (props.isDarkMode ? " dark-mode" : "")}>
            <div class="container">
                <h1>Where in the world?</h1>
                <button className="toggle" onClick={props.changeIsDarkMode}>
                    <i class={"bx bx-moon" + (props.isDarkMode && "bxs-moon")}></i>Dark Mode
                </button>
            </div>
        </header>
    );
};

export { Header };
