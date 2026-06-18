import React from "react";

const Users = ({ contact, selected, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-3xl border px-4 py-4 m-2 flex gap-4 items-center transition ${selected ? "border-cyan-500 bg-slate-800 text-white shadow-lg shadow-cyan-500/10" : "border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-800"}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 text-slate-950 text-xl font-bold shadow-lg shadow-cyan-500/20">
        {contact.name?.[0] || "U"}
      </div>
      <div className="truncate">
        <h1 className="text-lg font-semibold truncate">{contact.name}</h1>
        <p className="mt-1 text-sm text-slate-400 truncate">{contact.email}</p>
        <span
          className={`mt-2 inline-flex rounded-full px-2 py-1 text-[11px] font-semibold ${contact.status === "online" ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-700 text-slate-300"}`}
        >
          {contact.status}
        </span>
      </div>
    </button>
  );
};

export default Users;
