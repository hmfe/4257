import React from 'react'
import moment from 'moment'

import SearchInput from './components/SearchInput'
import SearchSuggestions from './components/SearchSuggestions'
import SearchHistory from './components/SearchHistory'

class SearchApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: undefined,
      searchHistory: [],
      searchResults: []
    }
  }

  componentDidMount () {
    // Load the searchQuery from the qs parameter when mounting the component, so that reloads work
    this.setState({ searchQuery: new URLSearchParams(window.location.search).get('q') })

    // Load the searchHistory from sessionStorage
    this.setState({ searchHistory: JSON.parse(sessionStorage.getItem('searchHistory') || '[]') })
  }

  handleSearch = (evt) => {
    evt.preventDefault()
    this.setState(prevState => {
      let newSearchHistory = [...prevState.searchHistory, {
        query: this.state.searchQuery,
        datetime: moment().toISOString()
      }] 
      sessionStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
      
      return ({
        searchHistory: newSearchHistory,
        searchQuery: undefined
      })})
  }

  handleSearchChange = (evt) => {
    let oldQuery = this.state.searchQuery || ''
    this.setState({ searchQuery: evt.target.value })
    let url = `http://libris.kb.se/xsearch?query=${encodeURIComponent(evt.target.value)}&format=json&n=20`
    if (evt.target.value.length >= oldQuery.length) {
      fetch(url)
        .then(response => {
          if (response.ok) {
           return response.json()
          } else {
            throw new Error('Could not retrieve search results')
          }
        }).then(content => {
          this.setState({ searchResults: (content.xsearch.list || []) })
        }).catch(e => console.error(e))
    }
  }

  handleClearQuery = (evt) => { this.setState({ searchQuery: ''}) } 

  handleSuggestionsClick = (query) => {
    this.setState(prevState => {
      let newSearchHistory = [...prevState.searchHistory, {
        query: query,
        datetime: moment().toISOString()
      }]
      sessionStorage.setItem('searchHistory', JSON.stringify(newSearchHistory))
      return ({
        searchQuery: query,
        searchHistory: newSearchHistory
      })})
  }

  handleClearSearchHistory = () => {
    this.setState({ searchHistory: [] })
    sessionStorage.removeItem('searchHistory')
  }

  handleClearHistoryItem = (i) => {
    let modHistory = [...this.state.searchHistory]
    modHistory.splice(i, 1)
    this.setState({ searchHistory: modHistory })
    sessionStorage.setItem('searchHistory', JSON.stringify(modHistory))
  }

  render () {
    return (
      <div id="search-app">
        <h1>Search application</h1>
        <SearchInput
          searchQuery={this.state.searchQuery}
          handleSearch={this.handleSearch}
          handleSearchChange={this.handleSearchChange}
          handleClearQuery={this.handleClearQuery}
          handleSetFocus={this.handleSetFocus}
        />
        <SearchSuggestions
          searchQuery={this.state.searchQuery}
          searchResults={this.state.searchResults}
          handleSuggestionsClick={this.handleSuggestionsClick}
        />
        <SearchHistory
          searchHistory={this.state.searchHistory} 
          handleClearSearchHistory={this.handleClearSearchHistory}
          handleClearHistoryItem={this.handleClearHistoryItem}
        />
      </div>
    )
  }
}

export default SearchApp
