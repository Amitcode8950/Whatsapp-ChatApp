import Users from "./Users";

const User = ({ contacts, selectedContactId, onSelectContact }) => {
  return (
    <div className="py-2">
      <h1 className="px-8 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Messages
      </h1>
      <div className="flex flex-col gap-1 px-2">
        {contacts.length === 0 ? (
          <p className="px-6 py-4 text-sm text-slate-500 text-center">
            No contacts found
          </p>
        ) : (
          contacts.map((contact) => (
            <Users
              key={contact._id}
              contact={contact}
              selected={contact._id === selectedContactId}
              onClick={() => onSelectContact(contact._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default User;
