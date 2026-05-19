import { create } from "zustand";
import anecdoteService from "../services/anecdotes";
import useNotificationStore from "./notificationStore";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async (id) => {
      const anecdoteToUpdate = get().anecdotes.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToUpdate,
        votes: anecdoteToUpdate.votes + 1,
      };
      const updated = await anecdoteService.updateAnecdote(id, updatedAnecdote);
      set((state) => {
        const anecdotes = state.anecdotes.map((a) =>
          a.id === id ? updated : a,
        );
        return { anecdotes };
      });
      useNotificationStore
        .getState()
        .setNotification(`You voted for: ${updatedAnecdote.content}`, 5);
    },
    create: async (content) => {
      const anecdote = asObject(content);
      const newAnecdote = await anecdoteService.createNew(anecdote);
      set((state) => {
        const anecdotes = state.anecdotes.concat(newAnecdote);
        return { anecdotes };
      });
      useNotificationStore
        .getState()
        .setNotification(`You created a new anecdote: ${content}`, 5);
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
