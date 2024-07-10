import { useState } from "react";
import { Settings } from "./Settings";

export const Navbar = () => {
  const [menu, showMenu] = useState(false);
  return (
    <nav className="h-16 w-full relative  bg-accent shadow-sm shadow-black">
      <button
        className="text-black relative p-4  text-2xl transition-transform duration-700"
        onClick={() => showMenu((r) => !r)}
      >
        {/*Checks Menu CLicked  */}
        {!menu ? (
          <i className="fa-solid fa-bars "></i>
        ) : (
          <i className="fa-solid fa-xmark "></i>
        )}
      </button>
      {menu ? <Settings></Settings> : null}
    </nav>
  );
};
