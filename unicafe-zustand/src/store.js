import { create } from "zustand";

const averageCalculator = (good, neutral, bad) => {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(1);
};

const positiveCalculator = (good, neutral, bad) => {
  const total = good + neutral + bad;
  if (total === 0) return 0;
  return ((good / total) * 100).toFixed(1) + "%";
};

const useCounterStore = create((set) => ({
  counter: {
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  },
  actions: {
    incrementGood: () =>
      set((state) => ({
        counter: {
          ...state.counter,
          good: state.counter.good + 1,
          all: state.counter.all + 1,
          average: averageCalculator(
            state.counter.good + 1,
            state.counter.neutral,
            state.counter.bad,
          ),
          positive: positiveCalculator(
            state.counter.good + 1,
            state.counter.neutral,
            state.counter.bad,
          ),
        },
      })),
    incrementNeutral: () =>
      set((state) => ({
        counter: {
          ...state.counter,
          neutral: state.counter.neutral + 1,
          all: state.counter.all + 1,
          average: averageCalculator(
            state.counter.good,
            state.counter.neutral + 1,
            state.counter.bad,
          ),
          positive: positiveCalculator(
            state.counter.good,
            state.counter.neutral + 1,
            state.counter.bad,
          ),
        },
      })),
    incrementBad: () =>
      set((state) => ({
        counter: {
          ...state.counter,
          bad: state.counter.bad + 1,
          all: state.counter.all + 1,
          average: averageCalculator(
            state.counter.good,
            state.counter.neutral,
            state.counter.bad + 1,
          ),
          positive: positiveCalculator(
            state.counter.good,
            state.counter.neutral,
            state.counter.bad + 1,
          ),
        },
      })),
  },
}));

// the hook functions that are used elsewhere in app
export const useCounter = () => useCounterStore((state) => state.counter);
export const useCounterControls = () =>
  useCounterStore((state) => state.actions);
