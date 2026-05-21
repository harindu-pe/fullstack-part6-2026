import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("../services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    updateAnecdote: vi.fn(),
    deleteAnecdote: vi.fn(),
  },
}));

import anecdoteService from "../services/anecdotes";
import useAnecdoteStore, {
  useAnecdotes,
  useAnecdoteActions,
} from "./anecdoteStore";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [
      { id: "1", content: "Anecdote 1", votes: 0 },
      { id: "2", content: "Anecdote 2", votes: 0 },
    ];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);
    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("anecdotes are sorted by votes in descending order", async () => {
    const mockAnecdotes = [
      { id: "1", content: "Anecdote 1", votes: 2 },
      { id: "2", content: "Anecdote 2", votes: 5 },
      { id: "3", content: "Anecdote 3", votes: 1 },
    ];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual([
      { id: "2", content: "Anecdote 2", votes: 5 },
      { id: "1", content: "Anecdote 1", votes: 2 },
      { id: "3", content: "Anecdote 3", votes: 1 },
    ]);
  });

  it("setFilter updates the filter state", async () => {
    const mockAnecdotes = [
      { id: "1", content: "Anecdote 1", votes: 2 },
      { id: "2", content: "Anecdote 2", votes: 5 },
      { id: "3", content: "Anecdote 3", votes: 1 },
    ];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.initialize();
    });

    await act(async () => {
      await result.current.setFilter("Anecdote 1");
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual([
      { id: "1", content: "Anecdote 1", votes: 2 },
    ]);
  });
});
