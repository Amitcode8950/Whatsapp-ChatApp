import { useEffect, useMemo, useRef, useState } from "react";
import Left from "./home/Left/Left";
import Right from "./home/Right/Right";
import Singup from "./compoents/Singup";
import Login from "./compoents/Login";
import VideoCall from "./home/Right/VideoCall";
import { createSocket } from "./socket";
import {
  loginApi,
  signupApi,
  getContactsApi,
  getMessagesApi,
} from "./utils/api";

const App = () => {
  const fallbackContacts = [
    { _id: "amit", name: "Amit", email: "amit@example.com", status: "online" },
    {
      _id: "anjali",
      name: "Anjali",
      email: "anjali@example.com",
      status: "online",
    },
  ];

  const initialConversation = [
    {
      _id: "msg1",
      from: "amit",
      to: "anjali",
      text: "Hey Anjali, are you ready for our chat?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      _id: "msg2",
      from: "anjali",
      to: "amit",
      text: "Yes Amit, let’s start! I am here.",
      createdAt: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    },
  ];

  const [view, setView] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [contacts, setContacts] = useState(fallbackContacts);
  const [selectedContactId, setSelectedContactId] = useState("anjali");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState(initialConversation);
  const [socket, setSocket] = useState(null);
  const [callState, setCallState] = useState({
    status: "idle",
    incoming: null,
    target: null,
    caller: null,
  });

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  );

  const selectedContact = useMemo(
    () => contacts.find((contact) => contact._id === selectedContactId) || null,
    [contacts, selectedContactId],
  );

  const conversation = useMemo(() => {
    if (!currentUser || !selectedContactId) return [];
    return messages.filter(
      (message) =>
        (message.from === currentUser._id && message.to === selectedContactId) ||
        (message.from === selectedContactId && message.to === currentUser._id),
    );
  }, [messages, selectedContactId, currentUser]);

  // Helper: mark a contact as online or offline
  const setContactStatus = (userId, status) => {
    setContacts((prev) =>
      prev.map((c) => (c._id === userId ? { ...c, status } : c)),
    );
  };

  useEffect(() => {
    if (!token) return;

    const client = createSocket(token);
    setSocket(client);

    client.on("connect_error", (error) => {
      console.error("Socket connect error:", error.message || error);
    });

    // Full snapshot of who is online right now
    client.on("online-users", (userIds) => {
      setContacts((prev) =>
        prev.map((c) => ({
          ...c,
          status: userIds.includes(c._id) ? "online" : "offline",
        })),
      );
    });

    // A user just came online
    client.on("user-online", ({ userId }) => {
      setContactStatus(userId, "online");
    });

    // A user just went offline
    client.on("user-offline", ({ userId }) => {
      setContactStatus(userId, "offline");
    });

    client.on("message-received", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    client.on("call-made", ({ from, offer, caller }) => {
      setCallState({
        status: "incoming",
        incoming: { from, offer },
        target: from,
        caller,
      });
    });

    client.on("call-accepted", async ({ answer }) => {
      await handleReceiveAnswer(answer);
      setCallState((prev) => ({ ...prev, status: "in-call" }));
    });

    client.on("ice-candidate", async ({ candidate }) => {
      if (peerConnectionRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(candidate);
        } catch (error) {
          console.error("Failed to add ICE candidate:", error);
        }
      }
    });

    client.on("call-ended", () => {
      endCall();
    });

    return () => {
      client.disconnect();
      setSocket(null);
    };
  }, [token]);

  useEffect(() => {
    if (!token) return;
    fetchContacts();
  }, [token]);

  useEffect(() => {
    if (contacts.length === 0 || selectedContactId) return;
    setSelectedContactId(contacts[0]._id);
  }, [contacts, selectedContactId]);

  useEffect(() => {
    if (!token || !selectedContactId) return;
    fetchMessages(selectedContactId);
  }, [token, selectedContactId]);

  const handleLogin = async (data) => {
    try {
      const response = await loginApi(data);
      setCurrentUser(response.user);
      setToken(response.token);
      setView("chat");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (data) => {
    try {
      const response = await signupApi(data);
      setCurrentUser(response.user);
      setToken(response.token);
      setView("chat");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    setView("login");
    setCurrentUser(null);
    setToken(null);
    setContacts([]);
    setMessages([]);
    setSelectedContactId(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    endCall();
  };

  const fetchContacts = async () => {
    try {
      const contactList = await getContactsApi(token);
      setContacts(contactList);
    } catch (error) {
      console.error(error);
      alert("Unable to load contacts.");
    }
  };

  const fetchMessages = async (contactId) => {
    try {
      const history = await getMessagesApi(contactId, token);
      setMessages(history);
    } catch (error) {
      console.error(error);
      setMessages([]);
    }
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedContactId || !currentUser || !socket) return;

    const message = {
      id: Date.now(),
      from: currentUser._id,
      to: selectedContactId,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, message]);
    socket.emit("send-message", message);
  };

  const getLocalStream = async () => {
    if (localStreamRef.current) {
      return localStreamRef.current;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    localStreamRef.current = stream;
    return stream;
  };

  const createPeerConnection = (targetId) => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && socket) {
        socket.emit("ice-candidate", {
          to: targetId,
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  const startCall = async (contactId) => {
    if (!socket || !contactId) return;

    const pc = createPeerConnection(contactId);
    peerConnectionRef.current = pc;
    const stream = await getLocalStream();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("call-user", { to: contactId, offer });
    setCallState({
      status: "calling",
      target: contactId,
      incoming: null,
      caller: selectedContact,
    });
  };

  const handleReceiveAnswer = async (answer) => {
    if (peerConnectionRef.current) {
      await peerConnectionRef.current.setRemoteDescription(answer);
    }
  };

  const acceptCall = async () => {
    if (!socket || !callState.incoming) return;

    const pc = createPeerConnection(callState.target);
    peerConnectionRef.current = pc;
    const stream = await getLocalStream();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    await pc.setRemoteDescription(callState.incoming.offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    socket.emit("accept-call", {
      to: callState.target,
      answer,
    });

    setCallState((prev) => ({ ...prev, status: "in-call" }));
  };

  const rejectCall = () => {
    if (socket && callState.target) {
      socket.emit("end-call", { to: callState.target });
    }
    setCallState({
      status: "idle",
      incoming: null,
      target: null,
      caller: null,
    });
  };

  const endCall = () => {
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (socket && callState.target) {
      socket.emit("end-call", { to: callState.target });
    }

    setCallState({
      status: "idle",
      incoming: null,
      target: null,
      caller: null,
    });
  };

  if (view === "signup") {
    return (
      <Singup
        onSignup={handleSignup}
        onSwitchToLogin={() => setView("login")}
      />
    );
  }

  if (view === "login") {
    return (
      <Login onLogin={handleLogin} onSwitchToSignup={() => setView("signup")} />
    );
  }

  return (
    <div className="relative flex h-screen min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <Left
        contacts={filteredContacts}
        selectedContactId={selectedContactId}
        onSelectContact={setSelectedContactId}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onLogout={handleLogout}
        currentUser={currentUser}
      />
      <Right
        selectedContact={selectedContact}
        messages={conversation}
        onSend={handleSendMessage}
        onStartCall={startCall}
        currentUserId={currentUser?._id}
      />
      {callState.status !== "idle" && (
        <VideoCall
          incomingCall={
            callState.status === "incoming" ? callState.caller : null
          }
          callStatus={callState.status}
          callPartner={selectedContact}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          acceptCall={acceptCall}
          rejectCall={rejectCall}
          stopCall={endCall}
        />
      )}
    </div>
  );
};

export default App;
