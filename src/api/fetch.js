const FETCH_ALL_URL = 'https://restcountries.com/v3.1/all';
const SEARCH_BY_NAME = 'https://restcountries.com/v3.1/name/';

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
 * 특정 국가 정보를 반환하는 함수
 *
 * @param name {string}  조회할 국가이름
 * @return {array} name에 해당되는 국가를 반환함
 */
async function searchCountriesByName (name) {
    console.log(SEARCH_BY_NAME+name);
    const fetchResult = await fetch(SEARCH_BY_NAME+name)
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

export { fetchAllCountries, searchCountriesByName };