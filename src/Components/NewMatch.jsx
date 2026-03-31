import { useResetMatch } from "../hooks/useResetMatch";

export const NewMatch = ({ closeMenu }) => {
  const clear = useResetMatch();

  const handleClear = () => {
    clear();
    if (closeMenu) closeMenu(); // Closes the entire sidebar after reset
  };

  return (
    <button
      className="flex-1 p-2 text-sm font-bold text-white transition bg-red-500 rounded-lg active:scale-95 hover:bg-red-600"
      onClick={handleClear}
    >
      Confirm Reset
    </button>
  );
};
