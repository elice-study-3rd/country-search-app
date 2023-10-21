import "../../styles/CountryCard.css";
import "../../styles/skeleton/Skeleton.css";

const CountryCardSkeleton = (props) => {
    return (
        <div className="cardContainer skeleton">
            <div className="cardImage skeletonBlock"></div>
            <section className="cardDescription">
                <h3 className="countryName skeletonTitle"> </h3>
                <span className="skeletonContent" style={{ animationDelay: "0.4s" }}></span>
                <span className="skeletonContent" style={{ animationDelay: "0.6s" }}></span>
                <span className="skeletonContent" style={{ animationDelay: "0.7s" }}></span>
            </section>
        </div>
    );
};

export { CountryCardSkeleton };
