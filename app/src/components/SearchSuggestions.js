import React from 'react'

import './SearchSuggestions.css'

const SearchSuggestions = props => {
  let hoverItem

  if (props.searchQuery && props.searchQuery.length > 0 && props.searchResults.length > 0) {
    return (
      <>
        <ul
          id='search-suggestions'
          className='search-suggestions'
        >
          {props.searchResults.map((item, i) => {
            // Check if query result should be bolded and calculate which part that should be
            let formatTitle = item.title
            let matchIndex = item.title.toLowerCase().indexOf(props.searchQuery.toLowerCase())
            if (matchIndex > -1) {
              formatTitle = [
                item.title.substring(0, matchIndex),
                <strong key={item.identifier}>
                  { item.title.substring(matchIndex, matchIndex + props.searchQuery.length) }
                </strong>,
                item.title.substring(matchIndex + props.searchQuery.length)
              ]
            }

            return (
              <li
                key={item.identifier}
                className={i === hoverItem
                  ? 'search-suggestions-item search-suggestions-item--selected'
                  : 'search-suggestions-item'}
                onClick={() => { props.handleSuggestionsClick(item.title) }}
                onMouseOver={() => { hoverItem = i }}
              >
                {formatTitle}
              </li>
            )
          })}
        </ul>
      </>
    )
  } else {
    return (
      <></>
    )
  }
}

export default SearchSuggestions
