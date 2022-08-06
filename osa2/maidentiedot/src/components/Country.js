import React from 'react'
import Flag from './Flag'
import Languages from './Languages'
import CountryMeta from './CountryMeta'
import Weather from './Weather'

const Country = ({country}) => {
  return (
    <div>
       <CountryMeta country={country}/>    
       <h3>Languages</h3>
       <Languages languages={country.languages} />
       <Flag flag={country.flags.png}/>
       <Weather country={country}/>
  </div> 
 )
}

export default Country