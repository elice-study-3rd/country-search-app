import { errorMessage } from "../constants/error";

import "../styles/Error.css";

const Error = (props) => {
    return (
        <article className="errorCard">
            <p className="errorTitle">Sorry, Error</p>
            <h1 className="errorCode">{props.errorCode}</h1>
            <p className="errorTitle">occurred</p>
            <p className="errorDescription">
                {errorMessage[props.errorCode]}
                {props.additionalMessage}
            </p>
        </article>
    );
};

export { Error };
