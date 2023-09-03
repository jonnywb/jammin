import React from 'react';
import styles from "./Search.module.css";

let searchByOptions = {
    "track": 'track',
    "artist": 'artist',
    "album": 'album',
    "playlist": 'playlist',
    "show": 'show',
    "episode": 'episode',
    "audiobook": 'audiobook'
}

function Search({setSearchTerm, setSearchBy, searchBy, searchTerm}) {

    const handleChange = (e) => {
        const value = e.target.value;
        return value.length > 2 ? setSearchTerm(value) : value;
    };

    const getSearchByClass = (searchByOption) => {
        if (searchBy === searchByOption) {
            return styles.active;
        }
        return "";
    };

    const handleSearchByChange = (searchByOption) => {
        if (searchByOption !== searchBy) {
            setSearchBy(searchByOption);
            setSearchTerm(searchTerm);
        }
    };

    const renderSearchByOptions = () => {
        return Object.keys(searchByOptions).map((searchByOption) => {
            let searchByOptionValue = searchByOptions[searchByOption];
            return (
              <li
                className={getSearchByClass(searchByOptionValue)}
                key={searchByOptionValue}
                onClick={() => {
                  handleSearchByChange(searchByOptionValue);
                }}
              >
                {searchByOption}
              </li>
            );
          });
    }

    return(
        <div className={styles.SearchBar}>
            <ul className={styles.SearchBarSortOptions}>
                { renderSearchByOptions() }
            </ul>
            <input type='text' placeholder="Search" onChange={ handleChange }></input>
        </div>
    )
}

export default Search;