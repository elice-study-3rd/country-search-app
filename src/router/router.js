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

    let renderPath = [];
    let result = [];

    if(path.join().includes("detail")) {
        renderPath = path[path.length-1].split('/');
    } else if (path.join().includes("search") || path.join().includes("region")) {
        renderPath =  path[path.length-1].split('?q=');
    } else {
        renderPath = path[path.length-1].split('/');
    }

    if(renderPath.length === 1) {
        if( renderPath[0] === "") {
            return fetcher.fetchAllCountries();
        } else {
            return fetcher.searchCountryByFullName(renderPath[0]);
        }
    } else if(renderPath.length > 1) {
        if(renderPath[0] === "search") {
            try {
                result = await fetcher.searchCountriesByName(renderPath[1]);
            } catch(error) {
                if (error.message === "404") {
                    result = [];
                }
            }
        } else if(renderPath[0] === "region"){
            try {
                result = await fetcher.searchCountriesByRegion(renderPath[1]);
            } catch(error) {
                if (error.message === "404") {
                    result = [];
                }
            }
        } 
    }

    return result;
}

export { contentRouter };