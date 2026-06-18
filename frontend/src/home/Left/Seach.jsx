import React from "react";
import { FaSearch } from "react-icons/fa";

const Seach = ({ value, onChange }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900 px-4 py-3 shadow-inner shadow-slate-950/50">
        <FaSearch className="text-slate-400" />
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type="search"
          placeholder="Search chats"
          className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-500"
        />
      </div>
    </div>
  );
};

export default Seach;
