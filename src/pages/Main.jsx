import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";
import { useState, useEffect } from "react";
import "../styles/Main.css";
import "../styles/Menu.css";

const Main = () => {
  const fetcher = new Fetcher();
  const { data, isLoading, isError } = useQuery(["country"], () =>
    fetcher.fetchAllCountries()
  );

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const [view, setView] = useState(false);
  const [viewRegion, setViewRegion] = useState(false);
  const [viewIndependent, setViewIndependent] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isIndependentFilter, setIsIndependentFilter] = useState(null);
  const [filterText, setFilterText] = useState("Filter");
  // 필터링된 데이터
  const [filteredData, setFilteredData] = useState(data);

  // 대륙별 필터링
  const handleFilterByRegion = () => {
    setViewRegion(!viewRegion);
  };

  // 독립/비독립국 필터링
  const handleFilterByIndependent = () => {
    setViewIndependent(!viewIndependent);
  };

  // sort type 변경
  const handleSortType = (type) => {
    if (type === sortType) {
      setSortType(null);
    } else {
      setSortType(type);
    }
  };

  // 대륙별 필터링 해주는 버튼
  const filteredCountries = (region) => {
    if (region === selectedRegion) {
      setSelectedRegion(null);
      setFilterText("Filter");
      setFilteredData(data);
      setView(false);
    } else {
      setSelectedRegion(region);
      setFilteredData(
        [...data].filter((country) => country?.region === region)
      );
      setFilterText(region);
      console.log(region);
      setView(false);
    }
  };

  // 독립별 필터링 해주는 버튼
  const filteredIndependent = (isIndependent) => {
    if (isIndependent === isIndependentFilter) {
      setFilterText("Filter");
      setView(false);
      setFilteredData(data);
      setIsIndependentFilter(null);
    } else {
      setFilteredData(
        [...data].filter((country) => country?.independent === isIndependent)
      );
      setFilterText(isIndependent ? "Independent" : "UnIndependent");
      setView(false);
      setIsIndependentFilter(isIndependent);
    }
  };

  // 소팅된 데이터
  const sortedCountries = (data) => {
    if (sortType === "국가명 오름차순") {
      return [...data].sort((a, b) => {
        const nameA = a?.name.common;
        const nameB = b?.name.common;
        return nameA.localeCompare(nameB);
      });
    }
    if (sortType === "국가명 내림차순") {
      return [...data].sort((a, b) => {
        const nameA = a?.name.common;
        const nameB = b?.name.common;
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
              <p>{filterText}</p>
              {view ? (
                <i className="fa-solid fa-chevron-down"></i>
              ) : (
                <i className="fa-solid fa-chevron-up"></i>
              )}
            </div>
            {view && (
              <ul className="dropdown_list">
                <li onClick={handleFilterByRegion}>
                  Filter by Region
                  {viewRegion && (
                    <ul className="region">
                      <li
                        onClick={() => {
                          filteredCountries("Africa");
                        }}
                      >
                        Africa
                      </li>
                      <li
                        onClick={() => {
                          filteredCountries("Americas");
                        }}
                      >
                        Americas
                      </li>
                      <li
                        onClick={() => {
                          filteredCountries("Asia");
                        }}
                      >
                        Asia
                      </li>
                      <li
                        onClick={() => {
                          filteredCountries("Europe");
                        }}
                      >
                        Europe
                      </li>
                      <li
                        onClick={() => {
                          filteredCountries("Oceania");
                        }}
                      >
                        Oceania
                      </li>
                    </ul>
                  )}
                </li>
                <li onClick={handleFilterByIndependent}>
                  Filter by Independent
                  {viewIndependent && (
                    <ul className="independent">
                      <li
                        onClick={() => {
                          filteredIndependent(true);
                        }}
                      >
                        Independent
                      </li>
                      <li
                        onClick={() => {
                          filteredIndependent(false);
                        }}
                      >
                        UnIndependent
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </div>
          <div className="sort-menu">
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list1"
                onClick={() => handleSortType("국가명 오름차순")}
                checked={sortType === "국가명 오름차순"}
              />
              <label htmlFor="align_list1">국가명 오름차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list2"
                onClick={() => handleSortType("국가명 내림차순")}
                checked={sortType === "국가명 내림차순"}
              />
              <label htmlFor="align_list2">국가명 내림차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list3"
                onClick={() => handleSortType("인구수 오름차순")}
                checked={sortType === "인구수 오름차순"}
              />
              <label htmlFor="align_list3">인구수 오름차순</label>
            </div>
            <div>
              <input
                type="radio"
                name="align_list"
                id="align_list4"
                onClick={() => handleSortType("인구수 내림차순")}
                checked={sortType === "인구수 내림차순"}
              />
              <label htmlFor="align_list4">인구수 내림차순</label>
            </div>
          </div>
        </div>
        <article className="cardList">
          {sortedCountries(filteredData)?.map((eachCountry) => (
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
