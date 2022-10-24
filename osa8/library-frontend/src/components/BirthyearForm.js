import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

const BirthyearForm = ({ names }) => {
  console.log(names);
  const [name, setName] = useState(names[0]);
  const [born, setBorn] = useState("");
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log("errors");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, setBornTo: parseInt(born) } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {names.map((n, i) => (
              <option key={i}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthyearForm;
