import { useState, useEffect } from "react";

import { useQuery, useSubscription, useApolloClient } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommendation from "./components/Recommendation";
import LoginForm from "./components/LoginForm";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState("authors");
  const result = useQuery(ALL_BOOKS);

  const client = useApolloClient();

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, []);
  const updateCache = (cache, query, addedBook) => {
    const uniqByName = (a) => {
      let seen = new Set();
      return a.filter((item) => {
        let k = item.title;
        return seen.has(k) ? false : seen.add(k);
      });
    };

    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      };
    });
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  if (result.loading) return <div>Loading...</div>;

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}

        {token && (
          <button onClick={() => setPage("recommendate")}>recommendate</button>
        )}

        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />
      <Books show={page === "books"} />
      {token && <NewBook show={page === "add"} />}
      {token && <Recommendation show={page === "recommendate"} />}
      {!token && (
        <LoginForm
          setPage={setPage}
          show={page === "login"}
          setToken={setToken}
          setError={notify}
        />
      )}
    </div>
  );
};

export default App;
