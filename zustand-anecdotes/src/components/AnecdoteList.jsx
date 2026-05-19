import React, { useEffect } from "react";
import {
  useAnecdotes,
  useAnecdoteActions,
  useFilter,
} from "../stores/anecdoteStore";

const AnecdoteList = () => {
  const { vote } = useAnecdoteActions();
  const anecdotes = useAnecdotes();
  const filter = useFilter();

  // Filter anecdotes based on the current filter value
  const filteredAnecdotes = anecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(filter.toLowerCase());
  });

  // Sort anecdotes by votes in descending order
  const sortedAnecdotes = [...filteredAnecdotes].sort(
    (a, b) => b.votes - a.votes,
  );

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
