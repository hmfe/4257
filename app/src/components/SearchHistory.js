import React from 'react'
import moment from 'moment'

import './SearchHistory.css'

const SearchHistory = props => {
  return (
    <div className='search-history'>

      <div className='search-history-head'>
        <h2 className='search-history-header'>Search history</h2>
        <button
          className='search-history-clear-button'
          onClick={props.handleClearSearchHistory}
        >
          Clear search history
        </button>
      </div>
      <hr />
      <ul
        id='search-history'
        className='search-history-list'
      >
        {(props.searchHistory || []).length > 0 && props.searchHistory.slice(0).reverse().map((item, i) => {
          i = props.searchHistory.length - i - 1 // Redifine i since the loop is backwards
          return (
            <li
              key={`${item.datetime}-${item.query}`}
              className='search-history-item'
            >
              <span className='search-history-query'>{ item.query }</span>
              <time
                className='search-history-datetime'
                dateTime={item.datetime}>
                { moment(item.datetime).format('lll') }
              </time>

              <button
                className='search-history-clear-item'
                onClick={() => props.handleClearHistoryItem(i)}
              >
              ×
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SearchHistory
