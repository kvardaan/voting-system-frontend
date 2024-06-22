import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { VoterRegistrationForm } from "../../components/dashboard/VoterRegistrationForm";

export const VoterRegistration = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.VOTER_REGISTRATION}</title>
			</Helmet>
			<div className="flex w-full items-center justify-between">
				<h1 className="text-2xl">Voter Registration</h1>
			</div>
			<div className="mt-4 items-center justify-between gap-2 md:mt-4">
				<VoterRegistrationForm />
			</div>
		</div>
	);
};
