import { FaCogs } from "react-icons/fa";

const Service = function(){
	const services = [
		{
			title: "AI Chatbots",
			desc: "Website/WhatsApp chatbots for support, lead capture, and FAQs.",
		},
		{
			title: "AI Automation",
			desc: "Automate repetitive work with AI agents and smart workflows.",
		},
		{
			title: "AI Integration",
			desc: "Connect AI with your apps, CRM, APIs, and databases securely.",
		},
		{
			title: "Analytics & Dashboards",
			desc: "Insights, reporting, and KPI dashboards for faster decisions.",
		},
		{
			title: "Custom AI Apps",
			desc: "Build AI tools tailored to your business requirements.",
		},
		{
			title: "AI Training",
			desc: "Team training to use AI safely and effectively in daily work.",
		},
	];
	return(
		<section className="w-full mt-15">
			<div className="flex items-end justify-between gap-4">
				<div className="bg-white/60 p-2 rounded-xl flex flex-row gap-2 items-center">
					<div className="bg-purple-200 text-xl text-purple-700 shadow-sm p-2 rounded">
						<FaCogs/> 
					</div>
					<div>
						<div className="text-md font-extrabold text-slate-900">Services</div>
						<h2 className="text-zinc-500 text-xs">AI solutions your team will actually use</h2>
					</div>
				</div>
				<a href="#contact" className="sm:text-md text-sm rounded-xl bg-white px-4 py-2 font-bold shadow-sm ring-1 ring-white/40 hover:bg-white/90">
					Request Quote
				</a>
			</div>

			<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{services.map((s) => (
				<div key={s.title} className="rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-white/40">
					<div className="text-lg font-extrabold">{s.title}</div>
					<div className="mt-2 text-sm text-slate-700/90">{s.desc}</div>
				</div>
				))}
			</div>
		</section>
	)
}

export default Service;