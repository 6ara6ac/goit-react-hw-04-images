import {useState} from "react"
import PropTypes from 'prop-types';

export const Searchbar = ( {fetch} ) => {
    const[searchQuery, setSearchQuery] = useState('')


   const onChange = (e) => {
      setSearchQuery(e.currentTarget.value)
      
      }

     const handleSubmit = (e) => {
      console.log(searchQuery)
        e.preventDefault()
        fetch(searchQuery)
        setSearchQuery('')
      }


    return <header className="Searchbar">
    <form onSubmit={handleSubmit} className="SearchForm">
      <button className="SearchForm-button button" type="submit" >
        <span className="button-label">Search</span>
      </button>
  
      <input onChange={onChange}
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        value={searchQuery}
        placeholder="Search images and photos"
      />
    </form>
  </header>
    
}

Searchbar.propTypes = {
  fetch: PropTypes.func.isRequired,
}