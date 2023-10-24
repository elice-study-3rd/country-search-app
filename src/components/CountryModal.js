import DefaultImage from "../assets/default/no_image.png";
import "../styles/CountryModal.css";

import React from 'react'

const CountryModal = (props) => {
    const back = document.querySelector(".back")
    const countryModal = document.querySelector(".countryModal")

    back.addEventListener("click", () => {
        countryModal.classList.toggle("show")
    })

    return (
        <body>
            <div className='countryModal show'>
                <button className='back'>Back</button>
                <div className='modal'>
                    <div className='leftModal'>
                        <img src={props.imageUrl} alt={props.countryName} />
                    </div>
                    <div className="rightModal">
                        <h1>${props.countryName}</h1>
                        <div className="modalInfo">
                            <div className="innerLeft inner">
                                <p><strong>Native Name:</strong> ${props.countryName}</p>
                                <p><strong>Population:</strong> ${props.population}</p>
                                <p><strong>Region:</strong> ${props.region}</p>
                                <p><strong>Sub-region:</strong> ${props.region}</p>
                                <p><strong>Capital:</strong> ${props.capital}</p>
                            </div>
                            <div className="innerRight inner">
                                <p><strong>Top Level Domain:</strong> ${props.population}</p>
                                <p><strong>Currencies:</strong> ${props.population}</p>
                                <p><strong>Languages:</strong> ${props.region}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}


CountryModal.defaultProps = {
    imageUrl: DefaultImage,
    countryName: "Country Name",
    population: 0,
    region: "Region",
    capital: "Capital",
};

export { CountryModal };