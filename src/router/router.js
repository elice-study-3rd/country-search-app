import { Fetcher } from "../api/fetch";

const fetcher = new Fetcher();

/* 
 * URL path에 따라 useQuery에 보낼 함수를 분기처리하는 간이 router
 * 1) index인 경우 : renderPath가 없음
 *    e.g. http://localhost:3000/ => ['']
 * 2) 특정 국가의 full-name인 경우 : renderPath가 해당 국가명
 *    e.g. http://localhost:3000/india => ['india']
 * 3) /search?query={name}이 있는 경우 : renderPath가 search, {name}으로 분리
 *    e.g. http://localhost:3000/search?q=korea => ['search', 'korea']
 * 4) /region?query={regionName}이 있는 경우 : renderPath가 region, {regionName}으로 분리
 *    e.g. http://localhost:3000/region?q=europe => ['region', 'europe']
 */
function contentRouter (path) {

    let renderPath = path[path.length-1].split('?q=');

    if(renderPath.length === 1) {
        if(renderPath[0] === "") {
            return fetcher.fetchAllCountries();
        } else {
            return fetcher.searchCountryByFullName(renderPath[0]);
        }
    } else if(renderPath.length > 1) {
        if(renderPath[0] === "search") {
            return fetcher.searchCountriesByName(renderPath[1]);
        } else if(renderPath[0] === "region"){
            return fetcher.searchCountriesByRegion(renderPath[1]);
        } 
    }
}

export default contentRouter;