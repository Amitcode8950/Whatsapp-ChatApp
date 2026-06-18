import Logout from "./Logout";
import Seach from "./Seach";
import User from "./User";

const Left = ({
  contacts,
  selectedContactId,
  onSelectContact,
  searchTerm,
  onSearch,
  onLogout,
  currentUser,
}) => {
  return (
    <div className="flex flex-col w-full max-w-[28rem] bg-slate-950 text-gray-200 border-r border-slate-800">
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-6 py-5">
        <div>
          <h2 className="text-2xl font-semibold">Chats</h2>
          <p className="mt-1 text-sm text-slate-400">
            {currentUser ? `Signed in as ${currentUser.name}` : "Please login"}
          </p>
        </div>
      </div>

      <Seach value={searchTerm} onChange={onSearch} />

      <div className="flex-1 overflow-y-auto">
        <User
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelectContact={onSelectContact}
        />
      </div>

      <Logout onLogout={onLogout} />
    </div>
  );
};

export default Left;
