import { useQuery } from "react-query";
import { Fetcher } from "../api/fetch";

const useCountryData = () => {
    const fetcher = new Fetcher();
    return useQuery(
        ["country"],
        () => {
            return fetcher.fetchAllCountries();
        },
        {}
    );
};

export { useCountryData };
