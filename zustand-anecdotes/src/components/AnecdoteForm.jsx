import React from "react";
import { useAnecdoteActions } from "../stores/anecdoteStore";

const AnecdoteForm = () => {
  const actions = useAnecdoteActions();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    actions.create(content);
    event.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
