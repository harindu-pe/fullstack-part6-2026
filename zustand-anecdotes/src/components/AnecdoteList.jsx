import React, { useEffect } from "react";
import { useAnecdotes, useAnecdoteActions, useFilter } from "../store";
import anecdoteService from "../services/anecdotes";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { vote, initialize } = useAnecdoteActions();
  const filter = useFilter();

  useEffect(() => {
    anecdoteService.getAll().then((anecdotes) => initialize(anecdotes));
  }, [initialize]);

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  );

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
