import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sports = [
  {
    id: "cricket",
    name: "Cricket",
    icon: "fa-cricket-bat-ball",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    available: true,
  },
];

export const Landing = () => {
  const [selectedSport, setSelectedSport] = useState(
    sports.length > 0 ? sports[0].id : null,
  );
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const goToTheSport = (sportId) => {
    if (sportId === "cricket") {
      navigate("/cricket/config");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-neutral-50 selection:bg-neutral-900 selection:text-white">
      {/* --- Restored Responsive Header --- */}
      <header className="relative z-30 flex items-center justify-between w-full px-6 py-8 mx-auto max-w-7xl md:px-12">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 shadow-2xl bg-neutral-900 rounded-2xl rotate-3">
            <i className="text-sm text-white fa-solid fa-clipboard-check"></i>
          </div>
          <h1 className="text-xl font-black leading-none tracking-tighter text-neutral-900">
            Score<span className="italic font-black text-dominant">Card</span>
          </h1>
        </div>

        {/* Auth Buttons - Visible on all screens */}
        {false && (
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setShowAuth(true)}
              className="text-[10px] md:text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors px-2"
            >
              Login
            </button>

            <button
              onClick={() => setShowAuth(true)}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-neutral-900 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full shadow-xl shadow-neutral-200 active:scale-95 transition-all"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      {/* --- Main Content --- */}
      <main className="relative flex flex-col justify-start flex-1 w-full max-w-5xl px-6 pt-4 pb-32 mx-auto md:justify-center md:pb-12">
        {/* Hero Section */}
        <div className="mb-12 text-left duration-700 animate-in fade-in slide-in-from-left-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-white border rounded-full border-neutral-200">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400"></span>
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
              Global Engine Active
            </p>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-neutral-900 leading-[0.85] tracking-tighter italic uppercase">
            Pick Your <br />
            <span className="not-italic text-neutral-200">Arena</span>
          </h1>
        </div>

        {/* --- Selection Grid --- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sport) => (
            <button
              key={sport.id}
              disabled={!sport.available}
              onClick={() => setSelectedSport(sport.id)}
              className={`
                relative group p-8 rounded-[40px] border-2 transition-all duration-500 text-left flex flex-col justify-between h-56
                ${!sport.available ? "opacity-40 grayscale border-dashed border-neutral-200" : ""}
                ${
                  selectedSport === sport.id
                    ? "border-neutral-900 bg-white shadow-2xl -translate-y-2"
                    : "border-transparent bg-neutral-100/50 hover:bg-neutral-100"
                }
              `}
            >
              <div
                className={`w-14 h-14 ${sport.bg} rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110`}
              >
                <i
                  className={`fa-solid ${sport.icon} ${sport.color} text-2xl`}
                ></i>
              </div>

              <div>
                <h3 className="text-2xl font-black tracking-tight text-neutral-900">
                  {sport.name}
                </h3>
                <p className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mt-1">
                  Ready to Score
                </p>
              </div>

              <div
                className={`absolute top-8 right-8 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 
                ${selectedSport === sport.id ? "bg-neutral-900 scale-100" : "bg-neutral-200/50 scale-75 opacity-0 group-hover:opacity-100"}`}
              >
                <i
                  className={`fa-solid ${selectedSport === sport.id ? "fa-check" : "fa-plus"} text-white text-xs`}
                ></i>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* --- Sticky Primary Action --- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-6 bg-gradient-to-t from-neutral-50 via-neutral-50 to-transparent md:relative md:bg-none md:p-12">
        <div className="w-full max-w-md mx-auto">
          <button
            disabled={!selectedSport}
            className={`
              group w-full py-6 rounded-[32px] text-xs font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3
              ${
                selectedSport
                  ? "bg-neutral-900 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] active:scale-95 hover:bg-black"
                  : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
              }
            `}
            onClick={() => goToTheSport(selectedSport)}
          >
            Start Arena
            <i className="transition-transform fa-solid fa-arrow-right group-hover:translate-x-2"></i>
          </button>
        </div>
      </div>

      {/* --- Auth Modal --- */}
      {showAuth && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <div
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setShowAuth(false)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-[40px] p-8 md:p-10 shadow-2xl animate-in slide-in-from-bottom-20 duration-500">
            <button
              onClick={() => setShowAuth(false)}
              className="absolute top-8 right-8 text-neutral-300 hover:text-neutral-900"
            >
              <i className="text-xl fa-solid fa-circle-xmark"></i>
            </button>
            <h2 className="mb-2 text-2xl font-black tracking-tighter">
              Welcome Back
            </h2>
            <p className="mb-8 text-xs font-bold tracking-widest uppercase text-neutral-400">
              Login to save match history
            </p>
            <div className="space-y-4">
              <button className="flex items-center justify-center w-full gap-3 py-4 text-[10px] font-black tracking-widest uppercase bg-neutral-100 rounded-2xl active:scale-95 border border-neutral-200">
                <i className="text-lg text-red-500 fa-brands fa-google"></i>{" "}
                Google
              </button>
              <button className="flex items-center justify-center w-full gap-3 py-4 text-[10px] font-black tracking-widest text-white uppercase bg-neutral-900 rounded-2xl active:scale-95">
                Email Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
