import Part from './Part/Part'
const Content = ({parts}) => {
  return parts && (
    <ul>{parts.map((p)=> <Part key={p.id} part={p}/>)}</ul>
    );
}
export default Content


