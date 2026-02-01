import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
const Section_1 = function(){
	const [show, setShow] = useState("What we deliver");
	const data = [
		{
			name: "What we deliver",
			value:
			"A complete AI consulting landing page that looks premium and converts. \n\nYou get a clean, modern UI, strong service-focused copy, clear CTAs, and a lead capture section that’s ready to use with real clients. It’s built to feel trustworthy and professional from the first scroll."
		},
		{
			name: "Built for mobile",
			value:
			"Designed mobile-first so it feels smooth on every screen size. \n\nButtons are easy to tap, spacing is readable, and sections stack naturally without breaking the layout. Optimized for fast loading and a clean user experience so visitors stay longer and take action."
		},
		{
			name: "Contact form works",
			value:
			"The contact form is not just UI — it actually submits data. \n\nLeads are sent to your backend API and stored (database or email pipeline), with proper validation and instant success/error feedback. This means you can start collecting real inquiries without any extra setup."
		}
	];

	
	return(
		<section className="grid items-center gap-10 md:grid-cols-2 mt-15">
			<div>
				<div className="rounded-3xl bg-white/70 p-7 shadow-sm ring-1 ring-white/40">
					<div className="inline-flex items-center gap-2 rounded-full bg-purple-700/10 px-3 py-1 text-xs font-bold text-purple-800 ring-1 ring-purple-700/10">
						High-speed AI delivery for real business results
					</div>

					<h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
						AI Consulting to <span className="text-purple-800">Automate</span> and <span className="text-purple-800">Scale</span> your business
					</h1>

					<p className="mt-4 text-sm md:text-base text-slate-800/90">
						We build AI chatbots, automations, and integrations that save time, reduce cost, and improve customer experience.
					</p>

					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<a
							href="#contact"
							className="rounded-2xl bg-slate-900 px-5 py-3 text-center text-white font-bold shadow-sm hover:bg-slate-800"
						>
							Get a Free AI Audit
						</a>
						<a
							href="#services"
							className="rounded-2xl bg-white px-5 py-3 text-center font-bold text-slate-900 shadow-sm ring-1 ring-slate-900/10 hover:bg-white/90"
						>
							View Services
						</a>
					</div>

					<div className="mt-6 grid grid-cols-3 gap-3 text-center">
						<div className="rounded-2xl bg-white/70 p-3 ring-1 ring-white/40">
							<div className="sm:text-lg text-sm font-extrabold text-slate-900">7–14d</div>
							<div className="text-xs text-slate-700/80">MVP Delivery</div>
						</div>
						<div className="rounded-2xl bg-white/70 p-3 ring-1 ring-white/40">
							<div className="sm:text-lg text-sm font-extrabold text-slate-900">ROI</div>
							<div className="text-xs text-slate-700/80">Focused Builds</div>
						</div>
						<div className="rounded-2xl bg-white/70 p-3 ring-1 ring-white/40">
							<div className="sm:text-lg text-sm font-extrabold text-slate-900">Secure</div>
							<div className="text-xs text-slate-700/80">Best Practices</div>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-3xl sm:bg-white/70 sm:p-7 sm:shadow-sm sm:ring-1 ring-white/40">
				<div className="grid gap-4">
					{data.map((i, index) => (
						<div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-900/5">
							<div className="p-1 bg-purple-100 rounded-xl flex flex-row items-center justify-between text-sm font-extrabold cursor-pointer" 
								onClick={() => setShow(i.name)}
							>
								<p className="ml-2">{i.name}</p>

								<div className="text-purple-500 hover:text-purple-600 p-2 rounded-lg bg-purple-200">
									{show == i.name ? <FaArrowDown/> : <FaArrowUp/>}
								</div>
							</div>
							{i.name == show &&
							<pre className="bg-purple-100 sm:shadow-xs hover:shadow shadow-lg cursor-pointer rounded-lg mt-2 p-2 text-sm font-semibold font-sans text-wrap text-purple-900/90">
								{i.value}
							</pre>
							}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Section_1;