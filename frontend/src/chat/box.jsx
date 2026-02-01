import { useState, useRef, useEffect, useCallback } from "react";
import { FaArrowLeft, FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "";

function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random()}`;
}

export default function Box({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [unseen, setUnseen] = useState(0);
  const endRef = useRef(null);

  const isAdmin = String(user?.email || "").toLowerCase() === String(ADMIN_EMAIL || "").toLowerCase();

	useEffect(() => {
		if (user?._id) setCurrentUser(user);
		}, [user?._id]);

		const fmt = (iso) => {
			try {
				return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
			} catch {
				return "";
			}
		};

		const headers = useCallback(() => {
			return {
			"Content-Type": "application/json",
			"x-user-id": user?._id || "",
			"x-user-email": user?.email || "",
		};
	}, [user?._id, user?.email]);

	const getUsers = useCallback(async () => {
		if (!isAdmin) return;
		try {
			const res = await fetch(`${API}/chat/getUser`, { headers: headers() });
			const data = await res.json();
			if (res.ok){
				setUsers(data.users);
				setUnseen(data.totalUnseen);
			}
		} catch {}
  	}, [isAdmin, headers]);

  const getChat = useCallback(
    async (silent = false) => {
      if (!currentUser?._id) return;
      if (!silent) setLoading(true);

      try {
        const res = await fetch(`${API}/chat/chat/${currentUser._id}`, { headers: headers() });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setMessages((prev) => {
            const pending = prev.filter((m) => String(m._id || "").startsWith("tmp-"));
            const byId = new Map();
            for (const m of data) byId.set(String(m._id), m);
            const merged = [...byId.values()];
            return [...merged, ...pending];
          });
        }
      } catch {} finally {
        if (!silent) setLoading(false);
      }
    },
    [currentUser?._id, headers]
  );

  useEffect(() => {
    if (!user?._id) return;
    if (isAdmin) getUsers();
  }, [user?._id, isAdmin, getUsers]);

  useEffect(() => {
    if (!currentUser?._id) return;

    let alive = true;
    getChat(false);

    const id = setInterval(() => {
      if (!alive) return;
      getChat(true);
	  getUsers();
    }, 2000);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [currentUser?._id, getChat]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  async function send(e) {
    e?.preventDefault?.();
    const t = message.trim();
    if (!t || !user?._id || !currentUser?._id || saving) return;

    setSaving(true);

    const tempId = `tmp-${uid()}`;
    const temp = {
      _id: tempId,
      userId: currentUser._id,
      sender: isAdmin ? "bot" : "user",
      message: t,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    setMessages((p) => [...p, temp]);
    setMessage("");

    try {
      const res = await fetch(`${API}/chat/chat/${currentUser._id}`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ message: t }),
      });

      const saved = await res.json();
      if (!res.ok) throw new Error("save failed");

      setMessages((p) => {
        const withoutTemp = p.filter((x) => x._id !== tempId);
        return [...withoutTemp, saved];
      });
    } catch {
      setMessages((p) => p.map((x) => (x._id === tempId ? { ...x, pending: false, failed: true } : x)));
    } finally {
      setSaving(false);
    }
  }

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("userId");
      window.location.reload();
    }
  };
  const handleSeen = async function(u){
	try{
		setCurrentUser(u);
		const res = await fetch(`${API}/chat/seen/${u._id}`);
		if(res.ok){

		}
	} catch (err) {
		console.log(err.message);
	}
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 p-4">
      {isAdmin && (
        <div className="sm:h-[80%] h-[90%] bg-purple-100 shadow-md">
          <div className="p-2 bg-purple-800 text-white font-bold flex justify-center" onClick={() => setShow((e) => !e)}>
            <p className="hidden sm:flex flex flex-row gap-2">
				Users 
				{unseen > 0 &&
				<p className="px-2 flex items-center text-xs bg-white text-black rounded-full">{unseen}</p>
				}
			</p>
            <FaBars className="flex sm:hidden" />
          </div>

          {users.map((u) => (
            <div
              key={u._id}
              className={`p-2 ${u._id === currentUser?._id ? "bg-purple-300" : "bg-purple-200"} flex flex-row gap-2 items-center cursor-pointer`}
              onClick={() => handleSeen(u)}
            >
              <div className="px-3 p-1 bg-purple-500 text-white sm:text-xl text-md font-bold rounded-lg">
                {String(u.name || "U")[0]}
              </div>
              <div className={`${!show && "hidden sm:flex flex-col"}`}>
                <p className="font-bold">{u.name} {u.email == ADMIN_EMAIL ? "(YOU)" : ""}</p>
                <p className="text-xs text-zinc-500">{u.email}</p>
              </div>
			  {u.unseen > 0 &&
			  <div>
				<p className="px-2 p-1 font-semibold flex items-center text-xs bg-white text-black rounded-full">{u.unseen}</p>
			  </div>
			  }
            </div>
          ))}
        </div>
      )}

      <div
        className={`sm:h-[80%] h-[90%] flex flex-col w-full max-w-xl ${isAdmin ? "" : "rounded-3xl"} border border-purple-100 bg-white/70 backdrop-blur-xl shadow-lg overflow-auto`}
      >
        <div className="sticky backdrop-blur-sm top-0 px-5 py-4 border-b border-purple-100 bg-gradient-to-r from-violet-100 via-purple-100 to-fuchsia-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold text-purple-900">
                {isAdmin ? `Chat: ${currentUser?.name || ""}` : "AI Consultant Chat"}
              </div>
              <div className="text-xs text-purple-700/70">{loading ? "Loading chat..." : "Auto refresh every 2s"}</div>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/">
                <FaArrowLeft className="bg-purple-200 hover:bg-purple-300 cursor-pointer h-8 w-8 text-purple-600 rounded-xl p-2.5" />
              </Link>
			  <button onClick={handleLogout}>
				<FaTrash className="bg-red-200 hover:bg-red-300 cursor-pointer h-8 w-8 text-red-600 rounded-xl p-2.5"/>
			  </button>
              <div className="h-9 w-9 rounded-2xl bg-white/70 border border-purple-100 grid place-items-center text-purple-800 font-extrabold">
                {isAdmin ? "AD" : "AI"}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto p-5 space-y-3">
          {messages.length === 0 && !loading && (
            <div className="rounded-2xl border border-purple-100 bg-white/70 p-4 text-sm text-purple-900">
              Start the conversation by sending a message.
            </div>
          )}

          {messages.map((m) => {
            let isUserMsg = m.sender === "user";
			if(user.email == ADMIN_EMAIL) isUserMsg = !isUserMsg;
            const key = m._id || `${m.userId}-${m.createdAt}`;

            return (
              <div key={key} className={`flex ${isUserMsg ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%]">
                  <div className={`flex items-end gap-2 ${isUserMsg ? "justify-end" : "justify-start"}`}>
                    {!isUserMsg && (
                      <div className="h-8 w-8 rounded-2xl bg-white/80 border border-purple-100 grid place-items-center text-xs font-extrabold text-purple-800">
                        {user.email == ADMIN_EMAIL ? currentUser.name.split("")[0] : "A"}
                      </div>
                    )}

                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUserMsg
                          ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white"
                          : "bg-white/85 border border-purple-100 text-purple-900"
                      }`}
                    >
                      {m.message}

                      {(m.pending || m.failed) && (
                        <div className={`mt-2 text-[11px] ${isUserMsg ? "text-white/80" : "text-purple-700/70"}`}>
                          {m.pending ? "Sending..." : "Failed to send"}
                        </div>
                      )}
                    </div>

                    {isUserMsg && (
                      <div className="h-8 w-8 rounded-2xl bg-white/80 border border-purple-100 grid place-items-center text-xs font-extrabold text-purple-800">
                        U
                      </div>
                    )}
                  </div>

                  <div className={`mt-1 text-[11px] ${isUserMsg ? "text-right" : "text-left"} text-purple-700/60`}>
                    {fmt(m.createdAt)}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="mt-auto h-fit shrink-0 sticky bottom-0 p-4 border-t border-purple-100 bg-white flex gap-2 overflow-auto">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-2xl border border-purple-200 bg-white/70 sm:px-4 sm:py-3 p-2 text-sm text-purple-900 placeholder:text-purple-400 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200"
            placeholder={isAdmin ? "Reply to user..." : "Type your message..."}
          />
          <button
            disabled={saving || !currentUser?._id}
            className="sm:rounded-2xl rounded-xl sm:px-5 sm:py-3 p-2 text-sm font-extrabold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow hover:opacity-95 active:opacity-90 disabled:opacity-60"
          >
            {saving ? "..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
