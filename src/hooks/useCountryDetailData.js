import { useQuery, useQueryClient } from "react-query";
import { Fetcher } from "../api/fetch";

const useCountryDetailData = (countryName) => {
    const fetcher = new Fetcher();
    const queryClient = useQueryClient();
    return useQuery(
        ["country-name", countryName],
        () => {
            return fetcher.searchCountriesByName(countryName);
        },
        {
            initialData: () => {
                const countryData = queryClient.getQueryData("country")?.data?.items.find((eachCountry) => eachCountry.name.common === countryName);
                if (countryData) {
                    return {
                        data: countryData,
                    };
                } else {
                    return undefined;
                }
            },
        }
    );
};

export { useCountryDetailData };
