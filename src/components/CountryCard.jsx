import DefaultImage from "../assets/default/no_image.png";
import "../styles/CountryCard.css";

import React from "react";

const CountryCard = (props) => {
    return (
        <div className="cardContainer">
            <img src={props.imageUrl} alt={props.countryName} className="cardImage"></img>
            <section className="cardDescription">
                <h3 className="countryName">{props.countryName}</h3>
                <span>
                    <span className="countryAttribute">Population: </span>
                    {props.population}
                </span>
                <span>
                    <span className="countryAttribute">Region: </span>
                    {props.region}
                </span>
                <span>
                    <span className="countryAttribute">Capital: </span>
                    {props.capital}
                </span>
            </section>
        </div>
    );
};

CountryCard.defaultProps = {
    imageUrl: DefaultImage,
    countryName: "Country Name",
    population: 0,
    region: "Region",
    capital: "Capital",
};

export { CountryCard };
