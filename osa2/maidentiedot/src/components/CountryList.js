import React from 'react'
import { useState } from 'react'
import Country from './Country';
const CountryList = ({filteredCountries}) => {
  const [showCountry, setShowCountry] = useState('');
  const displayCountry = (country) => setShowCountry(country)
  const filterCountry = filteredCountries.filter(c => c.name.common === showCountry)
  return (
    <>
      {
        showCountry.length ? 
          filterCountry.length === 1 ?
          <Country country={filterCountry[0]} /> : null
      : 
      <ul>
        {filteredCountries.map( c =>(<li key={c.name.common}>{c.name.common} { ' ' }
        <button onClick={()=>displayCountry(c.name.common)}>show</button></li>))}
      </ul>
      }
    </>
  )
}
export default CountryList