import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = function () {
  return (
    <section className="w-full mt-15">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Card */}
        <div className="rounded-3xl sm:bg-white/70 sm:p-7 p-2 sm:shadow-sm sm:ring-1 ring-white/40">
          <div className="bg-white/60 p-2 rounded-xl flex flex-row gap-2 items-center">
            <div className="bg-purple-200 text-xl text-purple-700 shadow-sm p-2 rounded">
              <FaPhone />
            </div>
            <div>
              <div className="text-md font-extrabold text-slate-900">Contact</div>
              <h2 className="text-zinc-500 text-xs">Tell us what you want to build</h2>
            </div>
          </div>

          <p className="p-2 text-sm text-slate-700/90">
            Share your goal and we’ll suggest the best AI solution and timeline.
          </p>

          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5">
              <div className="font-extrabold">Response time</div>
              <div className="text-slate-700/90">Within 24 hours</div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-900/5">
              <div className="font-extrabold">Delivery</div>
              <div className="text-slate-700/90">MVP in 7–14 days</div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/chat"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white font-extrabold shadow-sm hover:bg-slate-800"
            >
              Start Chat
              <span className="text-white/70">→</span>
            </Link>
            <p className="mt-3 text-center text-xs text-slate-600/90">
              Open chat and explain your requirements in detail.
            </p>
          </div>
        </div>

        {/* Right Card (UI instead of form) */}
        <div className="rounded-3xl bg-white/70 p-7 shadow-sm ring-1 ring-white/40">
          <div className="bg-white p-6 rounded-3xl ring-1 ring-slate-900/5">
            <div className="text-lg font-extrabold text-slate-900">Let’s build it together</div>
            <p className="mt-2 text-sm text-slate-700/90">
              Instead of filling a form, just jump into chat. Tell us:
            </p>

            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
                <div className="text-sm font-extrabold text-slate-900">1) What you want to automate</div>
                <div className="text-xs text-slate-600/90">Example: customer support, content posting, lead capture</div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
                <div className="text-sm font-extrabold text-slate-900">2) Your tech stack</div>
                <div className="text-xs text-slate-600/90">Example: React, Node, MongoDB, Flask, etc.</div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-900/5">
                <div className="text-sm font-extrabold text-slate-900">3) Timeline + budget</div>
                <div className="text-xs text-slate-600/90">We’ll suggest an MVP plan and next steps.</div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/chat"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-purple-600 px-5 py-3 text-white font-extrabold shadow-sm hover:bg-purple-700"
              >
                Go to Chat
              </Link>
              <div className="mt-3 text-center text-xs text-slate-600/90">
                Usually replies within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
