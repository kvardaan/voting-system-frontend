import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Button } from "../components/Button";
export const Landing = () => {
	return (
		<div className="flex flex-col h-screen justify-center items-center p-2 antialiased">
			<Helmet>
				<title>Voting System</title>
			</Helmet>
			<img src="./ai-robot.svg" alt="Logo" width={175} height={175} className="mb-2" />
			<div className="text-center">
				<p className="text-2xl md:text-3xl font-bold m-1">Welcome to the</p>
				<p className="text-5xl md:text-8xl font-extrabold text-orange-500 m-3">ML Based Voting System</p>
			</div>
			<Button className="font-semibold m-14 sm:m-10">
				<NavLink to="/dashboard">Continue</NavLink>
			</Button>
			<div className="text-center">
				<p className="text-2xl font-semibold m-3">
					&#8220;Empowering voters, with the right to free and fair elections&#33;&#8221;
				</p>
			</div>
		</div>
	);
};
