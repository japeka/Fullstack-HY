const Filter = ({searchTerm, handleChangeEvent}) => {
    return (
      <div>
      filter shown with
        <input 
          value={searchTerm} 
          onChange={handleChangeEvent}/>
      </div>
    )
  }
export default Filter