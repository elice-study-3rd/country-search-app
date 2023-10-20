import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { contentRouter } from "../router/router";
import { CountryCard } from "../components/CountryCard";
import { CountryCardSkeleton } from "../components/skeleton/CountryCardSkeleton";
import { Error } from "../components/Error";

import "../styles/Main.css";
import Search from "../components/Search";

const Main = () => {
    const fetcher = new Fetcher();
    let renderData = contentRouter(window.location.href.split('/')); 
    
    const { data, isLoading, isIdle, error } = useQuery(["country"], () => {
        return renderData;
    });

    const mainUIErrorMessage = {
        404: [<br />, "But It's not your fault. Maybe server error."],
    };

    if (isLoading || isIdle) {
        document.body.style.setProperty("overflow", "hidden");
        return (
            <main>
                <article className="cardList">
                    {new Array(8).fill("").map((_, index) => {
                        return <CountryCardSkeleton key={index}></CountryCardSkeleton>;
                    })}
                </article>
            </main>
        );
    } else if (data) {
        document.body.style.setProperty("overflow", "scroll");
        return (
            <main>
                <Search />
                <article className="cardList">
                    {data.map((eachCountry) => {
                        return (
                            <CountryCard
                                key={eachCountry.cca2}
                                imageUrl={eachCountry.flags.svg}
                                countryName={eachCountry.name.common}
                                population={eachCountry.population
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                region={eachCountry.region}
                                capital={eachCountry.capital}
                            ></CountryCard>
                        );
                    })}
                </article>
            </main>
        );
    } else {
        return (
            <main>
                <Error key={error ? error.message : "error"} errorCode={error && error.message} additionalMessage={error && mainUIErrorMessage[error.message]}></Error>
            </main>
        );
    }
};

export { Main };
