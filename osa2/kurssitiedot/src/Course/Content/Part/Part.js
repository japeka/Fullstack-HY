const Part = ({part}) => {
    return part && (<li>{part.name} {part.exercises}</li>)
}
export default Part