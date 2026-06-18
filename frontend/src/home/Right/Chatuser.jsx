import React from "react";
import { IoVideocam } from "react-icons/io5";

const Chatuser = ({ contact, onStartCall }) => {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xl font-bold">
          {contact?.name?.[0] || "C"}
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            {contact?.name || "Select a chat"}
          </h1>
          <span className="text-sm text-slate-400">
            {contact?.status || "offline"}
          </span>
        </div>
      </div>
      {contact && (
        <button
          type="button"
          onClick={onStartCall}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          <IoVideocam className="text-lg" /> Video
        </button>
      )}
    </div>
  );
};

export default Chatuser;
