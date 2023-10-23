import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";
import { useState } from "react";
import "../styles/Main.css";
import "../styles/Menu.css";

const Main = () => {
  const fetcher = new Fetcher();
  const { data, isLoading, isError } = useQuery(["country"], () =>
    fetcher.fetchAllCountries()
  );

  // console.log(data);

  const [view, setView] = useState(false);

  const [sortType, setSortType] = useState(null);

  const sortData = (type) => {
    if (type === sortType) {
      setSortType(null);
    } else {
      setSortType(type);
    }
  };

  const sortedNations = () => {
    if (sortType === "국가명 오름차순") {
      return [...data].sort((a, b) => {
        const nameA = a?.name?.common.toUpperCase();
        const nameB = b?.name?.common.toUpperCase();
        return nameA.localeCompare(nameB);
      });
    }
    if (sortType === "국가명 내림차순") {
      return [...data].sort((a, b) => {
        const nameA = a?.name?.common.toUpperCase();
        const nameB = b?.name?.common.toUpperCase();
        return nameB.localeCompare(nameA);
      });
    }
    if (sortType === "인구수 오름차순") {
      return [...data].sort((a, b) => a.population - b.population);
    }
    if (sortType === "인구수 내림차순") {
      return [...data].sort((a, b) => b.population - a.population);
    }
    return data; // 기본값
  };

  if (isLoading) {
    // 로딩창 렌더링
  } else if (isError) {
    // 에러 메시지 렌더링
  } else {
    return (
      <main>
        <header>{/* 검색창과 드롭다운 메뉴 */}</header>
        <div className="menu">
          <div className="dropdown-menu">
            <div
              className="dropdown-button"
              onClick={() => {
                setView(!view);
              }}
            >
              <p>Filter</p>
              {view ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {view && (
              <ul className="dropdown_list">
                <li>Filter by Region</li>
                <li>Filter by Independent</li>
              </ul>
            )}
          </div>
          <div className="sort-menu">
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list1"
                onClick={() => sortData("국가명 오름차순")}
                checked={sortType === "국가명 오름차순"}
                onChange={() => {}}
              />
              <label htmlFor="align_list1">국가명 오름차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list2"
                onClick={() => sortData("국가명 내림차순")}
                checked={sortType === "국가명 내림차순"}
                onChange={() => {}}
              />
              <label htmlFor="align_list2">국가명 내림차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list3"
                onClick={() => sortData("인구수 오름차순")}
                checked={sortType === "인구수 오름차순"}
                onChange={() => {}}
              />
              <label htmlFor="align_list3">인구수 오름차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list4"
                onClick={() => sortData("인구수 내림차순")}
                checked={sortType === "인구수 내림차순"}
                onChange={() => {}}
              />
              <label htmlFor="align_list4">인구수 내림차순</label>
            </div>
          </div>
        </div>
        <article className="cardList">
          {sortedNations().map((eachCountry) => (
            <CountryCard
              key={eachCountry.cca2}
              imageUrl={eachCountry.flags.svg}
              countryName={eachCountry.name.common}
              population={eachCountry.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              region={eachCountry.region}
              capital={eachCountry.capital}
            />
          ))}
        </article>
      </main>
    );
  }
};

export { Main };
