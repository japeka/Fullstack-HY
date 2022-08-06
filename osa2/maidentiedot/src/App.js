import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterCountry from './components/FilterCountry';
import CountryList from './components/CountryList';
import Country from './components/Country';

function App() {
  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => { setCountries(response.data)})
  }, [])
  
  const filteredCountries = countries.filter(p => p.name.common.toLowerCase().startsWith(countrySearch.toLowerCase()));
  const lenOfFilteredCountries = filteredCountries.length;

  return (
    <>
      <FilterCountry countrySearch={countrySearch} handleChangeEvent={(e)=>{setCountrySearch(e.target.value)}} />

      { countrySearch.length && filteredCountries &&  lenOfFilteredCountries > 10 ?
        <p>Too many matches, specify another filter</p> 

        : (lenOfFilteredCountries <= 10 && lenOfFilteredCountries > 1) ?
          <CountryList filteredCountries={filteredCountries}/>  

          : lenOfFilteredCountries === 1 ? 
            <Country country={filteredCountries[0]} /> 
            
            : null 
      }
    </>
  );
}

export default App;
