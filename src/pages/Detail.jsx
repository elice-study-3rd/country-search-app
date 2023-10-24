import { useCountryDetailData } from "../hooks/useCountryDetailData";
import "../styles/Detail.css";
import DefaultImage from "../assets/default/no_image.png";

const Detail = (props) => {
    const URLSearch = new URLSearchParams(window.location.search);
    const countryName = URLSearch.get("q");

    const { data } = useCountryDetailData(countryName);

    return (
        data && (
            <div className={"countryModal" + (props.isDarkMode ? " dark-mode" : "")}>
                <button
                    className="back"
                    onClick={() => {
                        window.history.back();
                    }}
                >
                    Back
                </button>
                <div className="modal">
                    <div className="leftModal">
                        <img src={data.imageUrl} alt={data.countryName} />
                    </div>
                    <div className="rightModal">
                        <h1>{data.countryName}</h1>
                        <div className="modalInfo">
                            <div className="innerLeft inner">
                                <p>
                                    <strong>Native Name:</strong> {data.countryName}
                                </p>
                                <p>
                                    <strong>Population:</strong> {data.population}
                                </p>
                                <p>
                                    <strong>Region:</strong> {data.region}
                                </p>
                                <p>
                                    <strong>Sub-region:</strong> {data.region}
                                </p>
                                <p>
                                    <strong>Capital:</strong> {data.capital}
                                </p>
                            </div>
                            <div className="innerRight inner">
                                <p>
                                    <strong>Top Level Domain:</strong> {data.population}
                                </p>
                                <p>
                                    <strong>Currencies:</strong> {data.population}
                                </p>
                                <p>
                                    <strong>Languages:</strong> {data.region}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

Detail.defaultProps = {
    imageUrl: DefaultImage,
    countryName: "Country Name",
    population: 0,
    region: "Region",
    capital: "Capital",
};

export { Detail };
