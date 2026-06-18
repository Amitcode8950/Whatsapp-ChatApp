import React from "react";
import { IoVideocam } from "react-icons/io5";

const Chatuser = ({ contact, onStartCall }) => {
  const online = contact?.status === "online";

  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-slate-950">
      <div className="flex items-center gap-4">
        {/* Avatar with status dot */}
        <div className="relative flex-shrink-0">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 text-xl font-bold">
            {contact?.name?.[0]?.toUpperCase() || "C"}
          </div>
          {contact && (
            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-slate-950 transition-colors duration-300 ${
                online
                  ? "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]"
                  : "bg-slate-500"
              }`}
            />
          )}
        </div>

        <div>
          <h1 className="text-xl font-semibold">
            {contact?.name || "Select a chat"}
          </h1>
          {contact && (
            <span
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                online ? "text-emerald-400" : "text-slate-500"
              }`}
            >
              <span
                className={`inline-block h-2 w-2 rounded-full ${online ? "bg-emerald-400" : "bg-slate-500"}`}
              />
              {online ? "Online" : "Offline"}
            </span>
          )}
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
