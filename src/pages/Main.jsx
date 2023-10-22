import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { contentRouter } from "../router/router";
import { CountryCard } from "../components/CountryCard";
import { CountryCardSkeleton } from "../components/skeleton/CountryCardSkeleton";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import Search from "../components/Search";

import "../styles/Main.css";
import NoResultImage from "../assets/default/no_result.png";

import { useEffect, useState } from "react";

const Main = () => {
    const fetcher = new Fetcher();
    const [countryData, setCountryData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);

    //검색 컴포넌트에서 API 호출 결과를 메인에 전달하기 위한 함수
    const changeCountryData = (data) => {
        setCountryData(data);
    };

    //헤더 컴포넌트에서 다크모드 적용 여부를 메인에 전달하기 위한 함수
    const changeIsDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    //API로부터 나라 정보를 가져옴 (React Query)
    const { data, isLoading, isIdle, error } = useQuery(["country"], () => {
        return renderData;
    });

    //메인 컴포넌트에서 에러를 띄울 때, 메인 컴포넌트만의 에러 메시지를 추가적으로 전달하기 위함
    const mainUIErrorMessage = {
        404: [<br />, "But It's not your fault. Maybe server error."],
    };

    //나라 정보가 새로 갱신될 때 실행되는 함수
    useEffect(() => {
        setCountryData(data);
        document.body.style.setProperty("overflow", "scroll"); //스크롤 가능하도록
    }, [data]);

    //로딩 시 혹은 react query를 아예 실행하지 않았을 때 실행되는 함수
    useEffect(() => {
        if (isLoading || isIdle) {
            document.body.style.setProperty("overflow", "hidden"); //화면 스크롤 불가능하도록
        }
    }, [isLoading, isIdle]);

    if (isLoading || isIdle) {
        //로딩 혹은 react query를 아예 실행하지 않았을 때
        return (
            <main>
                <article className="cardList">
                    {new Array(8).fill("").map((_, index) => {
                        return <CountryCardSkeleton key={index}></CountryCardSkeleton>;
                    })}
                </article>
            </main>
        );
    } else if (countryData) {
        //데이터가 있을 때
        return (
            <main className={isDarkMode ? "dark-mode" : ""}>
                <header>
                    <Header isDarkMode={isDarkMode} changeIsDarkMode={changeIsDarkMode} />
                    <Search changeCountryData={changeCountryData} />
                </header>
                {countryData.length <= 0 ? ( //검색 결과가 없으면
                    <article className="noResult">
                        <img src={NoResultImage} alt="no result"></img>
                        <h1 className="noResultText">There is no result</h1>
                    </article>
                ) : (
                    //검색 결과 있으면
                    <article className="cardList">
                        {countryData.map((eachCountry) => {
                            return (
                                <CountryCard
                                    key={eachCountry.cca2}
                                    imageUrl={eachCountry.flags.svg}
                                    countryName={eachCountry.name.common}
                                    population={eachCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    region={eachCountry.region}
                                    capital={eachCountry.capital}
                                    isDarkMode={isDarkMode}
                                ></CountryCard>
                            );
                        })}
                    </article>
                )}
            </main>
        );
    } else {
        //그 외의 경우를 모두 에러로 처리
        return (
            <main>
                <Error key={error ? error.message : "error"} errorCode={error && error.message} additionalMessage={error && mainUIErrorMessage[error.message]}></Error>
            </main>
        );
    }
};

export { Main };
