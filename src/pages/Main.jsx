import { useQuery } from "react-query";
import { fetchAllCountries } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";

import "../styles/Main.css";

const Main = () => {
    const { data, isLoading, isError } = useQuery(["country"], () => fetchAllCountries());

    if (isLoading) {
        //로딩창
    } else if (isError) {
        //에러
    } else {
        return (
            <main>
                <header>{/* 검색창과 드롭다운 메뉴 */}</header>
                <article className="cardList">
                    {data.map((eachCountry) => {
                        return (
                            <CountryCard
                                key={eachCountry.cca2}
                                imageUrl={eachCountry.flags.svg}
                                countryName={eachCountry.name.common}
                                population={eachCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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