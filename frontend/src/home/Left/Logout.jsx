import React from "react";
import { CiLogout } from "react-icons/ci";

const Logout = ({ onLogout }) => {
  return (
    <div className="p-4">
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-slate-200 hover:bg-slate-800"
      >
        <CiLogout className="text-2xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Logout;
