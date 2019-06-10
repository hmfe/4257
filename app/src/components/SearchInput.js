import React from 'react'

import './SearchInput.css'

const SearchInput = props => {
  return (
    <form
      className='search-form'
      onSubmit={props.handleSearch}
    >
      <input
        type='search'
        className='search-input'
        title='Search for books'
        placeholder='Search for books in Libris…'
        name='q'
        aria-label='Search for books'
        value={props.searchQuery || ''}
        onChange={props.handleSearchChange}
        required
      />
      <button
        className='search-clear'
        onClick={props.handleClearQuery}
        type='reset'
        aria-label='Clear search input'
      />
    </form>
  )
}

export default SearchInput
