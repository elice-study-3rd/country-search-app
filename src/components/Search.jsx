import "../styles/Search.css"
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";

import { Fetcher } from "../api/fetch";

const Search = () => {

    const [countriesByName, setCountriesByName] = useState(null);
    const [keyword, setKeyword] = useState("");
    const [keywordArguments, setKeywordArguments] = useState("");

    const fetcher = new Fetcher();

    // input onChange 핸들러
    const keywordChangeHandler = (e) => {
        setKeyword(e.target.value);
    }

    // form onSubmit 핸들러
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setKeywordArguments(keyword);
    }

    // input value값과 일부 일치하는 모든 국가 반환
    useEffect(() => {
        const findCountriesByName = async () => {
            if(keywordArguments !== "") {
                const result = await fetcher
                    .searchCountriesByName(keywordArguments);
                setCountriesByName(result);
            }
        }
        findCountriesByName();
    }, [keywordArguments]);

    return (
        <div className="searchContainer">
            <form className="searchForm" onSubmit={onSubmitHandler}>
                <button type="submit" className="submitButton">
                    <Icon
                        icon="tabler:search"
                        color="#777"
                        width="18"
                        height="18"
                    />
                </button>
                <input
                    type="text"
                    value={keyword}
                    onChange={keywordChangeHandler}
                    className="searchInput"
                    placeholder="Search for country..."
                />
            </form>
        </div>
    )
}

export default Search;