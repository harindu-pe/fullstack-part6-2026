import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: (id) =>
      set((state) => {
        const anecdotes = state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        );
        return { anecdotes };
      }),
    create: async (content) => {
      const anecdote = asObject(content);
      const newAnecdote = await anecdoteService.createNew(anecdote);
      set((state) => {
        const anecdotes = state.anecdotes.concat(newAnecdote);
        return { anecdotes };
      });
    },
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => {
        return { anecdotes };
      });
    },
    setFilter: (value) =>
      set(() => {
        return { filter: value };
      }),
  },
}));

export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
export const useFilter = () => useAnecdoteStore((state) => state.filter);
