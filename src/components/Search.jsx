import "../styles/Search.css";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

const Search = (props) => {

    const [keyword, setKeyword] = useState("");
    const [keywordDivide, setKeywordDivide] = useState("");

    // input onChange 핸들러
    const keywordChangeHandler = (e) => {
        setKeyword(e.target.value);
    };

    // form onSubmit 핸들러
    const onSubmitHandler = (e) => {
        e.preventDefault();
        setKeywordDivide(keyword);
    };

    // 키워드가 common 혹은 region인지 구분하여 obj로 전달
    useEffect(() => {
        const keywordTypeDivide = () => {

            let insertKeyword = {};

            props.data.map(allCountry => {
                // 데이터를 대문자로 바꾼 후 비교
                const upperKeyword = keywordDivide.toUpperCase();
                const commonData = allCountry.name.common.toUpperCase();

                // keyword가 common 혹은 region에 포함되어 true면 해당 값을 반환
                if (commonData.includes(upperKeyword)) {
                    insertKeyword["common"] = keywordDivide;
                }
                else {
                    insertKeyword["region"] = keywordDivide;
                }
            });

            props.setKeywordType(insertKeyword);
        }
        keywordTypeDivide();
    }, [keywordDivide])

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
                    placeholder="Search for country, region..."
                />
            </form>
        </div>
    )
}

export default Search;
