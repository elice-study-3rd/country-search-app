import { useCountryDetailData } from "../hooks/useCountryDetailData";

const Detail = (props) => {
    const URLSearch = new URLSearchParams(window.location.search);
    const countryName = URLSearch.get("q");

    const { data } = useCountryDetailData(countryName);

    return (
        <div className={props.isDarkMode ? "dark-mode" : ""}>
            <button onClick={() => props.changePath(`/`)}>Back</button>
            Detail Page <p>{JSON.stringify(data)}</p>
        </div>
    );
};

export { Detail };
