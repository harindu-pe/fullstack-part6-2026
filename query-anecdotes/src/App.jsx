import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import useNotification from "./hooks/useNotify";

const App = () => {
  const { anecdotes, isPending, isError, updateAnecdote } = useAnecdotes();

  const { triggerNotification } = useNotification();

  if (isPending) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <span>Error: {result.error.message}</span>;
  }

  const handleVote = (anecdote) => {
    updateAnecdote(anecdote);
    triggerNotification(`you voted '${anecdote.content}'`, 5);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
