const FETCH_ALL_URL = 'https://restcountries.com/v3.1/all';
const FETCH_BY_NAME_URL = 'https://restcountries.com/v3.1/name/';
const FETCH_BY_REGION_URL = 'https://restcountries.com/v3.1/region/';

/**
 * 전체 국가 목록을 반환하는 함수
 *
 * @return {array} 전체 국가 목록을 반환함
 */
async function fetchAllCountries () {
    const fetchResult = await fetch(FETCH_ALL_URL)
        .then( response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .catch( error => {
            console.log(error);
            return error;
        })
        
    return fetchResult;
}

/**
 * 파라미터와 '정확히' 일치하는 국가 정보를 반환하는 함수
 *
 * @param countryName {string}  조회할 국가이름 (Fullname)
 * @return {array} name에 해당되는 국가를 반환함 (1개)
 */
async function searchCountryByFullName (countryName) {
    const fetchResult = await fetch(FETCH_BY_NAME_URL+countryName+'?fullText=true')
        .then( response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .catch( error => {
            console.log(error);
            return error;
        })
        
    return fetchResult;
}

/**
 * 파라미터와 '일부' 일치하는 모든 국가 정보를 반환하는 함수
 *
 * @param countryName {string}  조회할 국가이름
 * @return {array} name에 해당되는 국가를 반환함 (n개)
 */
async function searchCountryByName (countryName) {
    const fetchResult = await fetch(FETCH_BY_NAME_URL+countryName)
        .then( response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .catch( error => {
            console.log(error);
            return error;
        })
        
    return fetchResult;
}

/**
 * 파라미터의 지역에 속하는 모든 국가 정보를 반환하는 함수
 *
 * @param regionName {string}  조회할 국가이름
 * @return {array} name에 해당되는 국가를 반환함 (n개)
 */
async function searchCountryByRegion (regionName) {
    const fetchResult = await fetch(FETCH_BY_REGION_URL+regionName)
        .then( response => {
            if (!response.ok) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .catch( error => {
            console.log(error);
            return error;
        })
        
    return fetchResult;
}

export { 
        fetchAllCountries, 
        searchCountryByFullName, 
        searchCountryByName, 
        searchCountryByRegion
    };