import "./App.css";

import { Header } from "./components/Header";
import { Main } from "./pages/Main";
import { Detail } from "./pages/Detail";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [path, setPath] = useState(window.location.pathname);

    const changeIsDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const changePath = (newPath) => {
        setPath(newPath);
    };

    return (
        <div className="App">
            <Header changeIsDarkMode={changeIsDarkMode} isDarkMode={isDarkMode}></Header>
            {
                {
                    "/": <Main isDarkMode={isDarkMode} changePath={changePath}></Main>,
                    "/detail": <Detail isDarkMode={isDarkMode} changePath={changePath}></Detail>,
                }[path]
            }
            <ReactQueryDevtools initialIsOpen="false" position="bottom-right"></ReactQueryDevtools>
        </div>
    );
}

export default App;
