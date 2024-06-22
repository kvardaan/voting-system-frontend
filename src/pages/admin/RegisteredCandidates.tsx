import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { RegisteredCandidatesTable } from "../../components/admin/RegisteredCandidatesTable";

export const RegisteredCandidates = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.REGISTERED_CANDIDATES}</title>
			</Helmet>
			<div className="flex w-full items-center justify-center md:justify-between">
				<h1 className="text-2xl">Registered Candidates</h1>
			</div>
			<div className="mt-4 min-w-full md:mt-4">
				<RegisteredCandidatesTable />
			</div>
		</div>
	);
};
