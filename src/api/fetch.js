import React from "react";

/**
 * Fetcher Class
 * URL 혹은 로컬 스토리지에 저장된 값을 반환받는 메소드를 포함한다.
 *
 * @fetchAllCountries 파라미터 없음
 * @searchCountryByFullName {countryName} 파라미터 필요
 * @searchCountriesByName {countryName} 파라미터 필요
 * @searchCountriesByRegion {regionName} 파라미터 필요
 */
class Fetcher extends React.Component {
    constructor() {
        super();
        this.FETCH_ALL_URL = "https://restcountries.com/v3.1/all";
        this.FETCH_BY_NAME_URL = "https://restcountries.com/v3.1/name/";
        this.FETCH_BY_REGION_URL = "https://restcountries.com/v3.1/region/";
    }

    /**
     * 전달받은 파라미터 URL로 부터 데이터를 받아와서 반환하는 내부 함수
     *
     * @return {array} 반환 받은 배열을 반환함
     */
    fetchFromURL(url) {
        const fetchResult = fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            })
            .catch((error) => {
                throw new Error(error.message);
            });

        return fetchResult;
    }

    /**
     * 전체 국가 목록을 반환하는 함수
     *
     * @localStorage "allCountries" 로컬스토리지에 저장되는 이름
     * @return {array} 전체 국가 목록을 반환함
     */
    async fetchAllCountries() {
        if (localStorage.getItem("allCountries") == null) {
            const fetchResult = await this.fetchFromURL(this.FETCH_ALL_URL);
            localStorage.setItem("allCountries", JSON.stringify(fetchResult));
            return fetchResult;
        } else {
            return JSON.parse(localStorage.getItem("allCountries"));
        }
    }

    /**
     * 파라미터와 '정확히' 일치하는 국가 정보를 반환하는 함수
     *
     * @localStorage {countryName} 로컬스토리지에 저장되는 이름 (e.g. south korea, usa)
     * @param countryName {string}  조회할 국가이름 (Fullname)
     * @return {array} countryName 해당되는 국가를 반환함 (1개)
     */
    async searchCountryByFullName(countryName) {
        if (localStorage.getItem(countryName) == null) {
            const fetchResult = await this.fetchFromURL(this.FETCH_BY_NAME_URL + countryName + "?fullText=true");
            localStorage.setItem(countryName, JSON.stringify(fetchResult));
            return fetchResult;
        } else {
            return JSON.parse(localStorage.getItem(countryName));
        }
    }

    /**
     * 파라미터와 '일부' 일치하는 모든 국가 정보를 반환하는 함수
     *
     * @param countryName {string}  조회할 국가이름
     * @return {array} countryName 해당되는 국가를 반환함 (n개)
     */
    async searchCountriesByName(countryName) {
        const fetchResult = await this.fetchFromURL(this.FETCH_BY_NAME_URL + countryName);

        return fetchResult;
    }

    /**
     * 파라미터의 지역에 속하는 모든 국가 정보를 반환하는 함수
     *
     * @localStorage {regionName} 로컬스토리지에 저장되는 이름 (e.g. asia, europe)
     * @param regionName {string}  조회할 국가이름
     * @return {array} regionName에 해당되는 국가를 반환함 (n개)
     */
    async searchCountriesByRegion(regionName) {
        if (localStorage.getItem(regionName) == null) {
            const fetchResult = await this.fetchFromURL(this.FETCH_BY_REGION_URL + regionName);
            localStorage.setItem(regionName, JSON.stringify(fetchResult));
            return fetchResult;
        } else {
            return JSON.parse(localStorage.getItem(regionName));
        }
    }
}

export { Fetcher };
