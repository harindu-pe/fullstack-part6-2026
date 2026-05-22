import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotify";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotes();

  const { triggerNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    addAnecdote(content);
    triggerNotification(`anecdote created: '${content}'`, 5);
    event.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
