import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";
import { useState } from "react";
import "../styles/Main.css";
import "../styles/DropDownMenu.css";

const Main = () => {
  const fetcher = new Fetcher();
  const { data, isLoading, isError } = useQuery(["country"], () =>
    fetcher.fetchAllCountries()
  );

  // 토글 상태
  const [view, setView] = useState(false);

  const Dropdown = () => {
    return (
      <ul className="Dropdown_list">
        <li id="list_Africa">Africa</li>
        <li id="list_America">America</li>
        <li id="list_Asia">Asia</li>
        <li id="list_Europe">Europe</li>
        <li id="list_Oceania">Oceania</li>
      </ul>
    );
  };

  if (isLoading) {
    //로딩창
  } else if (isError) {
    //에러
  } else {
    return (
      <main>
        <header>
          {/* 검색창과 드롭다운 메뉴 */}
          <div
            className="DropDown_Btn"
            onClick={() => {
              setView(!view);
            }}
          >
            <div>Filter by Region</div>
            {view ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
          </div>
          {view && <Dropdown />}
        </header>
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
