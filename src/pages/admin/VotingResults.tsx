import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { VotingResultsChart } from "../../components/admin/VotingResultsChart";

export const VotingResults = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.VOTING_RESULTS}</title>
			</Helmet>
			<div className="flex w-full items-center justify-center md:justify-between">
				<h1 className="text-2xl">Voting Results</h1>
			</div>
			<div className="mt-4 min-w-full md:mt-4">
				<VotingResultsChart />
			</div>
		</div>
	);
};
