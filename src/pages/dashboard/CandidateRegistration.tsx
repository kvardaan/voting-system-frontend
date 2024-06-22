import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";
import { CandidateRegistrationForm } from "../../components/dashboard/CandidateRegistrationForm";

export const CandidateRegistration = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.CANDIDATE_REGISTRATION}</title>
			</Helmet>
			<div className="flex w-full items-center justify-between">
				<h1 className="text-2xl">Candidate Registration</h1>
			</div>
			<div className="mt-4 items-center justify-between gap-2 md:mt-4">
				<CandidateRegistrationForm />
			</div>
		</div>
	);
};
