import "../styles/Search.css"
import { Icon } from '@iconify/react';

const Search = () => {

    return (
        <div className="searchContainer">
            <form className="searchForm">
                <button type="submit" className="submitButton" >
                    <Icon
                        icon="tabler:search"
                        color="#777"
                        width="18"
                        height="18"
                    />
                </button>
                <input
                    type="text"
                    className="searchInput"
                    placeholder="Search for country..."
                />
            </form>
        </div>
    )
}

export default Search;