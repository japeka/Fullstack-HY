const FilterCountry = ({countrySearch, handleChangeEvent}) => {
    return (
        <div>
        find countries { ' ' }
        <input 
          value={countrySearch}
          onChange={handleChangeEvent}
          />
      </div>
    )
  }

export default FilterCountry