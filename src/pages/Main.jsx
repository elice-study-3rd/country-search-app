import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";
import { CountryCard } from "../components/CountryCard";

import { CountryCardSkeleton } from "../components/skeleton/CountryCardSkeleton";
import { Error } from "../components/Error";
import { Header } from "../components/Header";
import Search from "../components/Search";

import "../styles/Main.css";
import "../styles/Menu.css";
import NoResultImage from "../assets/default/no_result.png";

import { useEffect, useState } from "react";

const Main = () => {
    const fetcher = new Fetcher();    
    const [countryData, setCountryData] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [view, setView] = useState(false);
    const [viewRegion, setViewRegion] = useState(false);
    const [viewIndependent, setViewIndependent] = useState(false);
    const [sortType, setSortType] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [isIndependentFilter, setIsIndependentFilter] = useState(null);
    const [filterText, setFilterText] = useState("Filter");

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
        return fetcher.fetchAllCountries();
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
  
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);
  
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
