import { useQuery, useQueryClient } from "react-query";
import { Fetcher } from "../api/fetch";
import React from "react";

const useCountryDetailData = (countryName) => {
    const fetcher = new Fetcher();
    const queryClient = useQueryClient();
    const queryInfo = useQuery(
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

    return {
        ...queryInfo,
        data: React.useMemo(
            () =>
                queryInfo.data
                    ?.map((countryData) => {
                        return {
                            countryName: countryData.name.common,
                            population: countryData.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                            region: countryData.region,
                            capital: countryData.capital,
                            imageUrl: countryData.flags.svg,
                        };
                    })
                    .at(0),
            [queryInfo.data]
        ),
    };
};

export { useCountryDetailData };
