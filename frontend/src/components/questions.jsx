import { FaArrowRight, FaQuestionCircle } from "react-icons/fa";

const Question = function(){
	const faqs = [
		{ q: "How fast can you deliver?", a: "Most MVPs in 7–14 days depending on scope." },
		{ q: "Do you work with existing systems?", a: "Yes, we integrate with your current tools and APIs." },
		{ q: "Is my data safe?", a: "We follow security best practices and can deploy with privacy-first options." },
		{ q: "Do you provide support?", a: "Yes, we offer maintenance and improvements after deployment." },
	];

	return(
		<section className="w-full mt-15">
			<div className="rounded-3xl sm:bg-white/70 sm:p-7 sm:shadow-sm sm:ring-1 ring-white/40">
				<div className="bg-white/60 p-2 rounded-xl flex flex-row gap-2 items-center">
					<div className="bg-purple-200 text-xl text-purple-700 shadow-sm p-2 rounded">
						<FaQuestionCircle/> 
					</div>
					<div>
						<div className="text-md font-extrabold text-slate-900">FAQ</div>
						<h2 className="text-zinc-500 text-xs">Quick answers</h2>
					</div>
				</div>

				<div className="mt-6 grid gap-4 md:grid-cols-2">
					{faqs.map((f, index) => (
						<div key={index} className="flex flex-col gap-1 sm:rounded-3xl rounded-xl bg-white sm:p-6 p-4 shadow-sm ring-1 ring-slate-900/5">
							<div className="font-extrabold flex flex-row gap-2 items-center">
								<div className="px-3 p-1 bg-purple-200 rounded-xl font-bold text-purple-700 h-fit w-fit">{index+1}</div>
								{f.q}
							</div>
							<div className="mt-2 text-sm flex flex-row gap-2 items-center sm:font-semibold text-slate-700/90">
								<div className="p-2 bg-purple-200 text-purple-700 rounded-xl">
									<FaArrowRight/>
								</div>
								{f.a}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default Question;