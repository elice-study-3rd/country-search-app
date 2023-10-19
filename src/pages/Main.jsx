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

  console.log(data);

  // 토글 상태
  const [view, setView] = useState(false);

  const Dropdown = () => {
    return (
      <ul className="Dropdown_list">
        <li id="list_Africa">Filter by Region</li>
        <li id="list_America">Filter by Independent</li>
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
        <header>{/* 검색창과 드롭다운 메뉴 */}</header>
        <div className="dropDown_wrapping">
          <div
            className="DropDown_Btn"
            onClick={() => {
              setView(!view);
            }}
          >
            <div>Filter</div>
            {view ? (
              <i className="fa-solid fa-chevron-down"></i>
            ) : (
              <i className="fa-solid fa-chevron-up"></i>
            )}
          </div>
          {view && <Dropdown />}
          <div className="Align">
            <input type="radio" name="Align_list" id="Align_list1"></input>
            <label for="Align_list1">국가명 오름차순</label>
            <input type="radio" name="Align_list" id="Align_list2"></input>
            <label for="Align_list2">국가명 내림차순</label>
            <input type="radio" name="Align_list" id="Align_list3"></input>
            <label for="Align_list3">인구수 오름차순</label>
            <input type="radio" name="Align_list" id="Align_list4"></input>
            <label for="Align_list4">인구수 내림차순</label>
          </div>
        </div>
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
