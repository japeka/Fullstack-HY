import React from "react";
import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendation = (props) => {
  const resultBook = useQuery(ALL_BOOKS);
  const resultMe = useQuery(ME);

  if (!props.show || !resultBook.data || !resultMe.data) {
    return null;
  }

  if (resultMe.loading || resultBook.loading) {
    return <p>Loading...</p>;
  }

  const favoriteGenre = resultMe?.data?.me?.favoriteGenre;
  const books = resultBook.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
