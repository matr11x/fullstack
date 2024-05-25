import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryView = ({ country }) => {
  return (
    <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(value => (
            <li key={value}> {value} </li>
          ))}
        </ul>
        <p>{country.flag}</p>
      </div>
  )
}

const ShowCountries = ({ countriesToShow, handleShowCountry }) => {
  if (countriesToShow.length === 1) {
    return (
      <div>
        <CountryView country = {countriesToShow[0]}></CountryView>
      </div>
    )
  }

  return (
    <div>
      {countriesToShow.length < 10 ? (
        <ul>
          {countriesToShow.map((country, index) => (
            <li key={index}> 
            {country.name.common}
            <button onClick={() => handleShowCountry(country.name.common)}> show </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Too many matches, specify another filter</p>
      )}
    </div>
  )
}

function App() {
  const [newCountry, setNewCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(responce => {
          setCountries(responce.data)
        })
        .catch(error => {
          setCountries([])
          console.log(`The country '${newCountry}' does not exist`)
        })
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
    setSelectedCountry(null);
  }

  const handleShowCountry = (name) => {
    const country = countries.find(c => c.name.common === name)
    setSelectedCountry(country);
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))

  return (
    <div>
      find countries
        <input 
          value = {newCountry}
          onChange = {handleCountryChange}
        />

        {selectedCountry ? (
          <CountryView country={selectedCountry} />
        ) : (
          <ShowCountries countriesToShow = {countriesToShow} handleShowCountry={handleShowCountry}> </ShowCountries>
        )}
    </div>
  )
}

export default App
