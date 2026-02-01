import { FaProjectDiagram } from "react-icons/fa";

const Process = function(){
	const steps = [
		{ title: "Discover", desc: "We understand your goal, data, and process." },
		{ title: "Build", desc: "We create a fast prototype and iterate with you." },
		{ title: "Deploy", desc: "We ship, monitor, and improve the solution." },
	];

	return(
		<section className="w-full mt-15">
			<div className="rounded-3xl bg-white/70 sm:p-7 p-2 shadow-sm ring-1 ring-white/40">
				<div className="bg-white/60 p-2 rounded-xl flex flex-row gap-2 items-center">
					<div className="bg-purple-200 text-xl text-purple-700 shadow-sm p-2 rounded">
						<FaProjectDiagram/> 
					</div>
					<div>
						<div className="text-md font-extrabold text-slate-900">Process</div>
						<h2 className="text-zinc-500 text-xs">Simple steps, fast execution</h2>
					</div>
				</div>

				<div className="mt-6 grid gap-4 md:grid-cols-3">
				{steps.map((st, idx) => (
					<div key={st.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
					<div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-700/10 font-extrabold text-purple-800">
						{idx + 1}
					</div>
					<div className="mt-3 text-lg font-extrabold">{st.title}</div>
					<div className="mt-2 text-sm text-slate-700/90">{st.desc}</div>
					</div>
				))}
				</div>
			</div>
		</section>
	)
}

export default Process;