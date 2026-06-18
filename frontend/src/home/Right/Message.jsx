import React, { useEffect, useRef } from "react";
import Messagechat from "./Messagechat";

const Message = ({ messages, currentUserId }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-slate-950">
      <div className="overflow-y-auto px-6 py-5 space-y-4 h-full">
        {messages.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-400">
            No messages yet. Send the first message.
          </div>
        ) : (
          messages.map((message) => (
            <Messagechat
              key={message._id || message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Message;
