const CountryMeta = ({country}) => {
  return (
    <>
       <h1>{country.name.common}</h1>
       <p>capital {country.capital}</p>
       <p>area {country.area}</p>
    </>
  )
}
export default CountryMeta