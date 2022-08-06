import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Weather = ({country}) => {
    const [weatherData, setWeatherData] = useState({})
    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_NOT_SECRET_CODE}`)
          .then(response => { 
            console.log('response.data', response.data)
            setWeatherData(response.data)
          })
      }, [])
  const convertToCelcius = (k)=> (k - 273.15).toFixed(1)
  return (  
    <>
      {
        country && Object.keys(weatherData).length > 0  && 
          <>
            <h3>Weather in {country.capital[0]}</h3>
            <p>temperature {convertToCelcius(weatherData.main.temp)} Celcius</p>
            <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} />
            <p>wind {weatherData.wind.speed} m/s</p>
          </>
      }
    </>
  )
}
export default Weather