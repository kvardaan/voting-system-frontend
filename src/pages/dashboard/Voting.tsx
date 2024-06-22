import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { VotingForm } from "../../components/dashboard/VotingForm";

export const Voting = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.VOTING}</title>
			</Helmet>
			<div className="flex w-full items-center justify-between">
				<h1 className="text-2xl">Voting</h1>
			</div>
			<div className="mt-4 items-center justify-between gap-2 md:mt-4">
				<VotingForm />
			</div>
		</div>
	);
};
