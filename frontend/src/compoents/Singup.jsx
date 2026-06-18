import { useForm } from "react-hook-form";

const Singup = ({ onSignup, onSwitchToLogin }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const validatePasswordMatch = (value) =>
    value === password || "Passwords do not match";

  const onSubmit = (data) => {
    onSignup({
      name: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    });
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_100%)] min-h-screen w-screen flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl text-white"
      >
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
            Create account
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Signup</h1>
          <p className="mt-2 text-slate-400">
            Join the chat and connect instantly
          </p>
        </div>
        <div className="space-y-4">
          <label className="flex flex-col gap-2 text-slate-300">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Username
            </span>
            <input
              {...register("fullname", {
                required: "Username is required",
                minLength: 3,
              })}
              type="text"
              placeholder="Username"
              className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none shadow-sm shadow-slate-900/20"
            />
          </label>
          {errors.fullname && (
            <span className="text-red-500 text-sm">
              {errors.fullname.message}
            </span>
          )}

          <label className="flex flex-col gap-2 text-slate-300">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Email
            </span>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="mail@site.com"
              className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none shadow-sm shadow-slate-900/20"
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <label className="flex flex-col gap-2 text-slate-300">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Password
            </span>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: 8,
              })}
              type="password"
              placeholder="Password"
              className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none shadow-sm shadow-slate-900/20"
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm">
              Password must be at least 8 characters
            </span>
          )}

          <label className="flex flex-col gap-2 text-slate-300">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Confirm Password
            </span>
            <input
              {...register("confirmpassword", {
                required: "Confirm password is required",
                validate: validatePasswordMatch,
              })}
              type="password"
              placeholder="Confirm Password"
              className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none shadow-sm shadow-slate-900/20"
            />
          </label>
          {errors.confirmpassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmpassword.message}
            </span>
          )}

          <div className="mt-4 flex flex-col gap-4">
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              Signup
            </button>
            <p className="text-center text-slate-400">
              Have an account?
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="ml-2 text-cyan-300 underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Singup;
