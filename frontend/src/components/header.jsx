import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = function({user}){
	const menu = ["home", "services", "work", "process", "Q&A", "contact"];
	const [menu_button, setMenu_button] = useState(false);
	const [currentMenu, setcurrentMenu] = useState("services");

	return(
		<div className="h-full w-full sm:p-2 md:px-10 p-2 grid grid-cols-3">
			<div className="sm:w-fit w-[150%] flex flex-row bg-white/40 hover:bg-white/50 rounded-lg p-1 shadow hover:shadow-lg cursor-pointer">
				<div className="w-full text-lg px-2 flex text-purple-600 items-center bg-purple-200 rounded-lg shadow-xs font-bold">AI</div>
				<div className="w-full shrink-0 text-sm px-2">
					<p className="font-bold">Nova AI Consulting</p>
					<p className="text-xs text-zinc-700">Build • Automate • Scale</p>
				</div>
			</div>

			<div className="w-fit sm:ml-0 ml-auto flex items-center text-xs">
				<div className="bg-black text-white rounded-lg p-2">
					{user ?
						<div>
							<Link to={"/chat"}>
								{user.name}
							</Link>
						</div>
						:
						<Link to="/login">
							Sign in
						</Link>
					}
				</div>
			</div>

			<div className="sm:w-full w-fit ml-auto flex justify-end">
				<div className="hidden sm:flex flex-row gap-2 items-center">
					{menu.map((i, index) => (
						<div key={index} className="text-sm">
							<a href={`#${i}`} className={`${currentMenu == i ? "bg-black text-white" : "sm:bg-purple-100 bg-purple-200 hover:bg-purple-200"} rounded-lg font-semibold p-2 capitalize`}
								onClick={() => setcurrentMenu(i)}
							>{i}</a>
						</div>
					))}
				</div>
				<div className="relative sm:hidden flex items-center justify-center">
					<button className="font-bold bg-white px-2 p-1 rounded-lg cursor-pointer shadow focus:shadow-md"
						onClick={() => setMenu_button(e => !e)}
					>
						menu
					</button>
					{menu_button && (
						<div className="absolute inset-0 top-10 left-auto">
						{menu.map((i, index) => (
							<div key={index} className={`${currentMenu == i ? "bg-black text-white" : "bg-white/90 hover:bg-white/50"} text-xs px-3 py-2 font-semibold capitalize text-sm`}>
								<a href={`#${i}`}
									onClick={() => {
										setMenu_button(e => !e);
										setcurrentMenu(i);
									}}
								>{i}</a>
							</div>
						))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header;