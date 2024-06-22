import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { RegisteredVotersTable } from "../../components/admin/RegisteredVotersTable";

export const RegisteredVoters = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.REGISTERED_VOTERS}</title>
			</Helmet>
			<div className="flex w-full items-center justify-center md:justify-between">
				<h1 className="text-2xl">Registered Voters</h1>
			</div>
			<div className="mt-4 min-w-full md:mt-4">
				<RegisteredVotersTable />
			</div>
		</div>
	);
};
