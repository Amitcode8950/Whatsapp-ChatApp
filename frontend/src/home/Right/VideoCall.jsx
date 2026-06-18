import { IoCall, IoClose } from "react-icons/io5";

const VideoCall = ({
  incomingCall,
  callStatus,
  callPartner,
  localVideoRef,
  remoteVideoRef,
  acceptCall,
  rejectCall,
  stopCall,
}) => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-5">
      <div className="w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {incomingCall
                ? `${incomingCall.name} is calling...`
                : callStatus === "calling"
                  ? `Calling ${callPartner?.name}...`
                  : "Video call"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {incomingCall
                ? "Accept to connect with video and audio."
                : callStatus === "calling"
                  ? "Waiting for the other user to accept."
                  : "Use the controls below to end the call."}
            </p>
          </div>
          <button
            onClick={stopCall}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200 transition hover:border-red-500 hover:text-red-400"
          >
            <IoClose /> Close
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-3">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">
              Your video
            </p>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="h-80 w-full rounded-3xl bg-black object-cover"
            />
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-3">
            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-500">
              {incomingCall ? "Caller video" : "Remote video"}
            </p>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="h-80 w-full rounded-3xl bg-black object-cover"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {incomingCall ? (
            <>
              <button
                onClick={acceptCall}
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                <IoCall /> Accept
              </button>
              <button
                onClick={rejectCall}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-800"
              >
                <IoClose /> Reject
              </button>
            </>
          ) : (
            <button
              onClick={stopCall}
              className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Hang Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
