import Chatuser from "./Chatuser";
import Message from "./Message";
import Typesend from "./Typesend";

const Right = ({ selectedContact, messages, onSend, onStartCall, currentUserId }) => {
  return (
    <div className="flex w-full flex-col bg-slate-900 text-gray-100">
      <Chatuser
        contact={selectedContact}
        onStartCall={() => selectedContact && onStartCall(selectedContact._id)}
      />
      <div className="flex-1 overflow-hidden">
        <Message messages={messages} currentUserId={currentUserId} />
      </div>
      <Typesend onSend={onSend} />
    </div>
  );
};

export default Right;
