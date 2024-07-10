import { useResetMatch } from "../hooks/useResetMatch";


export const NewMatch = () => {
  const clear = useResetMatch();
  const clearAll = () => {
    clear();
  };
  return (
    <>
      <button
        className="p-2 m-6 mb-2  text-xl font-semibold col-span-4 bg-dominant text-text-1 rounded-lg"
        onClick={clearAll}
      >
        Start New Match
      </button>
      <p className="text-center text-xs text-text-1 opacity-70">
        ? New Match will Reset all the Score recorded till now.
      </p>
    </>
  );
};
