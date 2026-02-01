import Contact from "./contact";
import Header from "./header";
import Question from "./questions";
import Process from "./process";
import Section_1 from "./section1";
import Service from "./service";
import Work from "./work";

const Landing = function({user}){
	return(
		<div className="w-full h-full bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 overflow-auto">
			<div className="fixed flex flex-col h-fit inset-0 top-0 z-50 bg-white/60 backdrop-blur-md">
				<Header user={user}/>
			</div>
			<div className="sm:w-full mx-auto md:max-w-7xl">

				<div id="home" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Section_1/>
				</div>

				<div id="services" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Service/>
				</div>

				<div id="work" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Work/>
				</div>

				<div id="process" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Process/>
				</div>

				<div id="Q&A" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Question/>
				</div>

				<div id="contact" className="w-full flex flex-row justify-center md:p-10 p-4">
					<Contact/>
				</div>


				<footer className="md:p-10 p-4">
					<div className="rounded-3xl bg-white/60 p-6 shadow-sm ring-1 ring-white/40 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div className="text-sm font-extrabold">Nova AI Consulting</div>
						<div className="text-xs text-slate-700/90">
						© {new Date().getFullYear()} • AI Consulting • Automation • Integrations
						</div>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default Landing;