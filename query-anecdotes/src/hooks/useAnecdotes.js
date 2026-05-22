import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import useNotification from "./useNotification";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const { triggerNotification } = useNotification();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      triggerNotification("too short anecdote, must have length 5 or more", 5);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
    onError: (error) => {
      console.error("Error updating anecdote:", error);
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => {
      newAnecdoteMutation.mutate({ content, votes: 0 });
    },
    updateAnecdote: (anecdote) => {
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    },
  };
};
