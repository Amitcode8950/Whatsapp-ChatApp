import React from "react";

const Messagechat = ({ message, currentUserId }) => {
  const isSelf = message.from === currentUserId || message.from?._id === currentUserId;
  return (
    <div className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-[28px] p-4 shadow-lg ${isSelf ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 shadow-cyan-500/20" : "bg-slate-800 text-slate-100 shadow-slate-900/20"}`}
      >
        <div className="text-sm leading-relaxed">{message.text}</div>
        <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-slate-400">
          <span>
            {message.createdAt
              ? new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
          <span
            className={`rounded-full px-2 py-1 ${isSelf ? "bg-slate-950/10" : "bg-white/5"}`}
          >
            {isSelf ? "You" : "Friend"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Messagechat;
