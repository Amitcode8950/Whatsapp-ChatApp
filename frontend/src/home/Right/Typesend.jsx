import { useState } from "react";
import { IoSend } from "react-icons/io5";

const Typesend = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 items-center px-6 py-4 bg-slate-950 border-t border-slate-800"
    >
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        type="text"
        placeholder="Type your message..."
        className="flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />
      <button
        type="submit"
        className="rounded-full bg-cyan-500 p-3 text-slate-950 shadow-lg shadow-cyan-500/20"
      >
        <IoSend className="text-xl" />
      </button>
    </form>
  );
};

export default Typesend;
