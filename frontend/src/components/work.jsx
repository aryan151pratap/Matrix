import { FaBriefcase } from "react-icons/fa";

const Work = function(){
	const projects = [
		{ title: "Support Chatbot", metric: "Reduced support load by 35%", desc: "FAQ + ticket routing + lead capture." },
		{ title: "Report Automation", metric: "Saved 10+ hours/week", desc: "Auto summaries and daily KPI reporting." },
		{ title: "AI Search for Docs", metric: "Faster answers in seconds", desc: "Search internal docs with smart retrieval." },
	];

	return(
		<section className="w-full mt-15">
			<div className="bg-white/60 p-2 rounded-xl flex flex-row gap-2 items-center">
				<div className="bg-purple-200 text-xl text-purple-700 shadow-sm p-2 rounded">
					<FaBriefcase/> 
				</div>
				<div>
					<div className="text-md font-extrabold text-slate-900">Work</div>
					<h2 className="text-zinc-500 text-xs">Sample outcomes</h2>
				</div>
			</div>

			<div className="mt-6 grid gap-4 md:grid-cols-3">
				{projects.map((p) => (
				<div key={p.title} className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-white/40">
					<div className="text-lg font-extrabold">{p.title}</div>
						<div className="mt-2 inline-flex rounded-full bg-purple-700/10 px-3 py-1 text-xs font-bold text-purple-800 ring-1 ring-purple-700/10">
							{p.metric}
						</div>
					<div className="mt-3 text-sm text-slate-700/90">{p.desc}</div>
				</div>
				))}
			</div>
		</section>
	)
}

export default Work;