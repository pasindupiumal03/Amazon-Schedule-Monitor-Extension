import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Assuming logo is copied to root folder from public
const LOGO_SRC = "logo_dark.99265b07.svg";

const Popup = () => {
  const [url, setUrl] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isanimate, setIsAnimate] = useState(false);

  useEffect(() => {
    // Enable button only if URL is not empty and looks like a URL
    if (url.trim().length > 0 && (url.startsWith("http") || url.startsWith("https"))) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [url]);

  const handleStart = () => {
    if (isButtonEnabled) {
      setIsAnimate(true);
      setTimeout(() => {
        chrome.tabs.create({ url: url });
      }, 300);
    }
  };

  return (
    <div className="w-[380px] h-[520px] bg-zinc-950 text-white font-sans overflow-hidden flex flex-col relative selection:bg-indigo-500/30">

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Header / Logo */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-10 pb-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-zinc-900 ring-1 ring-zinc-800 rounded-2xl p-6 shadow-2xl">
            <img
              src={LOGO_SRC}
              alt="Amazon Jobs"
              className="w-32 h-auto object-contain invert brightness-0 opacity-90"
            />
          </div>
        </div>
        <h1 className="mt-6 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500">
          Schedule Monitor
        </h1>
        <p className="text-zinc-500 text-sm mt-1 font-medium">Auto-refresh automation</p>
      </div>

      {/* Controls Container */}
      <div className="relative z-10 px-6 pb-8 space-y-5">

        {/* Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider ml-1">
            Target URL
          </label>
          <div className="relative group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste the hiring link here..."
              className="w-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 
                            outline-none transition-all duration-200
                            focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 focus:bg-zinc-900"
            />
            <div className={`absolute inset-y-0 right-3 flex items-center pointer-events-none transition-opacity duration-300 ${url.length > 0 ? 'opacity-0' : 'opacity-100'}`}>
              <svg className="w-4 h-4 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStart}
          disabled={!isButtonEnabled}
          className={`
            relative w-full group overflow-hidden rounded-xl p-[1px] transition-all duration-300
            ${isButtonEnabled ? "cursor-pointer active:scale-[0.98]" : "cursor-not-allowed opacity-50 grayscale"}
          `}
        >
          <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 transition-all duration-1000 ${isButtonEnabled ? 'animate-gradient-x opacity-100' : 'opacity-0'}`}></div>
          <div className="relative bg-zinc-950 h-full rounded-xl flex items-center justify-center py-3.5 transition-all group-hover:bg-transparent">
            <span className={`font-semibold text-sm tracking-wide transition-colors ${isButtonEnabled ? 'group-hover:text-white text-zinc-200' : 'text-zinc-600'}`}>
              {isanimate ? "Launching..." : (isButtonEnabled ? "Start Automating" : "Enter Link to Start")}
            </span>
            {isButtonEnabled && !isanimate && (
              <svg className="w-4 h-4 ml-2 text-indigo-400 group-hover:text-white transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
            {isanimate && (
              <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            )}
          </div>
        </button>

        {/* Footer */}
        <div className="pt-2 border-t border-zinc-900/50 flex items-center justify-between text-[10px] text-zinc-600 font-medium">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            System Ready
          </span>
          <span className="opacity-50">v1.0.0</span>
        </div>
      </div>

    </div>
  );
};

const container = document.getElementById("react-target");
const root = createRoot(container);
root.render(<Popup />);