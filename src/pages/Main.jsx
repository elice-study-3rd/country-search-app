import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";
import Search from "../components/Search";

import "../styles/Main.css";

const Main = () => {
    const fetcher = new Fetcher();
    const { data, isLoading, isError } = useQuery(["country"], () =>
        fetcher.fetchAllCountries()
    );

    if (isLoading) {
        //로딩창
    } else if (isError) {
        //에러
    } else {
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
    }
};

export { Main };
