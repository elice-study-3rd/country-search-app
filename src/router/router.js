import { Fetcher } from "../api/fetch";

const fetcher = new Fetcher();

/* 
 * URL path에 따라 useQuery에 보낼 함수를 분기처리하는 간이 router
 * 1) index인 경우 : renderPath가 없음
 *    e.g. http://localhost:3000/ => ['']
 * 2) 특정 국가의 full-name인 경우 : renderPath가 deatil {full-name}으로 분리
 *    e.g. http://localhost:3000/detail/india => ['detail', 'india']
 * 3) /search?query={name}이 있는 경우 : renderPath가 search, {name}으로 분리
 *    e.g. http://localhost:3000/search?q=korea => ['search', 'korea']
 * 4) /region?query={regionName}이 있는 경우 : renderPath가 region, {regionName}으로 분리
 *    e.g. http://localhost:3000/region?q=europe => ['region', 'europe']
 */
async function contentRouter (path) {

    let renderPath = new URL(path);
    let searchParam = ""; // fetch 함수에 전달할 파라미터
    let result = []; // 반환할 결과 배열
    
    if(renderPath.pathname !== "/") {
        // pathname이 있는 경우 - e.g. localhost:3000/search?q=korea
        // search 값은 ?q=korea가 되기 때문에 앞 3글자는 삭제한 값을 검색 파라미터에 할당
        searchParam = renderPath.search.substring(3);
    } 

    if(renderPath.pathname === "/") {
        result = await fetcher.fetchAllCountries();
    } else if(renderPath.pathname === "/search") {
        try {
            result = await fetcher.searchCountriesByName(searchParam);
            if(Object.keys(result).length === 0) result = [];
        } catch(error) {
            if (error.status === "404") result = [];
        }
    } else if(renderPath.pathname === "/region"){
        try {
            result = await fetcher.searchCountriesByRegion(searchParam);
            if(Object.keys(result).length === 0) result = [];
        } catch(error) {
            if (error.status === "404") result = [];
        }
    } else if(renderPath.pathname === "/detail"){
        try {
            result = await fetcher.searchCountryByFullName(searchParam);
            if(Object.keys(result).length === 0) result = [];
        } catch(error) {
            if (error.status === "404") result = [];
        }
    }

    return result;
}

export { contentRouter };