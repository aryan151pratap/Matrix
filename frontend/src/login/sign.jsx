import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login({user, setUser}) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const nav = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const url = mode === "login" ? `${API}/login/login` : `${API}/login/signup`;

      const body =
        mode === "login"
          ? { email, password }
          : { name, email, password };

      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const j = await r.json();

      if (r.ok) {
        localStorage.setItem("userId", j._id);
		setUser(j);
        nav("/chat");
      } else {
        setMsg(j.msg || "Failed");
      }
    } catch (e) {
      setMsg("Server error");
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m) {
    setMode(m);
    setMsg("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-purple-100 bg-white/70 backdrop-blur-xl shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-purple-100 bg-gradient-to-r from-violet-100/70 via-purple-100/70 to-fuchsia-100/70">
          <div className="text-xl font-semibold text-purple-900">
            {mode === "login" ? "Welcome back" : "Create account"}
          </div>
          <div className="text-sm text-purple-700/70">
            {mode === "login" ? "Login to continue" : "Signup to continue"}
          </div>
        </div>

        <div className="px-6 pt-5">
          <div className="grid grid-cols-2 rounded-2xl border border-purple-200 bg-white/60 p-1">
            <button
              onClick={() => switchMode("login")}
              className={`rounded-2xl py-2 text-sm ${
                mode === "login"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow"
                  : "text-purple-800"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode("signup")}
              className={`rounded-2xl py-2 text-sm ${
                mode === "signup"
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow"
                  : "text-purple-800"
              }`}
            >
              Signup
            </button>
          </div>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          {mode === "signup" ? (
            <div>
              <label className="text-sm text-purple-900">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-purple-200 bg-white/70 px-4 py-3 text-sm text-purple-900 placeholder:text-purple-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
                placeholder="Your name"
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm text-purple-900">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-purple-200 bg-white/70 px-4 py-3 text-sm text-purple-900 placeholder:text-purple-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="text-sm text-purple-900">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-2xl border border-purple-200 bg-white/70 px-4 py-3 text-sm text-purple-900 placeholder:text-purple-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
              placeholder="********"
              type="password"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-2xl px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow hover:opacity-95 active:opacity-90 disabled:opacity-60"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
          </button>

          {msg ? <div className="text-sm text-purple-800">{msg}</div> : null}
		  <Link to="/" className="w-fit flex flex-row items-center gap-2 bg-purple-600 text-white font-bold p-2 rounded-xl">
		  	<FaArrowLeft className="text-sm"/>
		  	Back
		  </Link>
        </form>
      </div>
    </div>
  );
}
