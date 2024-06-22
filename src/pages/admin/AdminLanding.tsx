import { Helmet } from "react-helmet";

import { PageTitle } from "../../utils/pageTitles";

export const AdminLanding = () => {
	return (
		<div className="w-full">
			<Helmet>
				<title>{PageTitle.ADMIN}</title>
			</Helmet>
			<div className="flex w-full items-center justify-center md:justify-between">
				<h1 className="text-2xl">Admin</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-4">
				<p>Content here!</p>
			</div>
		</div>
	);
};
