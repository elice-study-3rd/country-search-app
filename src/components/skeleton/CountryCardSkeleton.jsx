import "../../styles/CountryCard.css";
import "../../styles/skeleton/Skeleton.css";

const CountryCardSkeleton = (props) => {
    return (
        <div className="cardContainer skeleton">
            <div className="cardImage skeletonBlock"></div>
            <section className="cardDescription">
                <h3 className="countryName skeletonTitle"> </h3>
                <span className="skeletonContent"></span>
                <span className="skeletonContent"></span>
                <span className="skeletonContent"></span>
            </section>
        </div>
    );
};

export { CountryCardSkeleton };
