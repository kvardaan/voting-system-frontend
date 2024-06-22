import { Helmet } from "react-helmet";

export const DashboardLanding = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>Voting System | Dashboard</title>
			</Helmet>
			<div className="flex w-full items-center justify-between">
				<h1 className="text-2xl">Dashboard</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-4">
				<p>Content here!</p>
			</div>
		</div>
	);
};
