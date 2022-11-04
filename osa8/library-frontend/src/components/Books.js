import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [genre, setGenre] = useState("all genres");
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks);
    }
  }, [genreResult.data]);

  if (!props.show || !books) {
    return null;
  }

  if (result.loading || genreResult.loading) return <div>Loading...</div>;

  const { allBooks } = result.data;
  const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat(
    "all genres"
  );

  const handleClick = (genre) => {
    setGenre(genre);
    if (genre === "all genres") {
      setBooks(result.data.allBooks);
      return;
    }
    getBooksByGenre({ variables: { genre: genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <p>books of {genre} genre</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Books;
