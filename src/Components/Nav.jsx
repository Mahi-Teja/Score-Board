import { useEffect, useRef, useState } from "react";
import { ProfileMenu } from "./ProfileMenu";

export const Navbar = () => {
  const [menu, showMenu] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        showMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* Main Bar */}
      <nav className="sticky top-0 z-[60] flex items-center justify-between w-full h-16 px-5 bg-white border-b border-neutral-100 shadow-sm">
        {/* Left Side: Brand & Live Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h1 className="text-xl font-black leading-none tracking-tighter text-neutral-900">
              Score<span className="text-dominant">Card</span>
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                Cricket
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">
                Live Match
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Menu Icon */}
        <button
          onClick={() => showMenu((prev) => !prev)}
          className={`
            relative w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300
            ${menu ? "bg-neutral-900 text-white" : "bg-neutral-50 text-neutral-700"}
            active:scale-90
          `}
        >
          {menu ? (
            <i className="text-lg fa-solid fa-xmark" />
          ) : (
            <div className="flex flex-col items-end gap-1">
              <span className="w-5 h-0.5 bg-current rounded-full" />
              <span className="w-3 h-0.5 bg-current rounded-full" />
              <span className="w-4 h-0.5 bg-current rounded-full" />
            </div>
          )}
        </button>
      </nav>

      {/* Backdrop with Blur */}
      {menu && (
        <div
          className="fixed inset-0 z-40 duration-500 bg-neutral-900/10 backdrop-blur-md animate-in fade-in"
          onClick={() => showMenu(false)}
        />
      )}

      {/* Dropdown with Modern Slide Transition */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-50
          transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${
            menu
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-10 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="mx-2 md:mx-auto md:max-w-sm mt-2  overflow-hidden shadow-2xl rounded-[32px] border border-neutral-100 bg-white">
          <ProfileMenu closeMenu={() => showMenu(false)} />
        </div>
      </div>
    </div>
  );
};
