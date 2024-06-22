import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { Landing } from "./pages/Landing";
import { Voting } from "./pages/dashboard/Voting";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminLanding } from "./pages/admin/AdminLanding";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardLanding } from "./pages/dashboard/DashboardLanding";
import { VoterRegistration } from "./pages/dashboard/VoterRegistration";
import { CandidateRegistration } from "./pages/dashboard/CandidateRegistration";
import { VotingResults } from "./pages/admin/VotingResults";
import { RegisteredCandidates } from "./pages/admin/RegisteredCandidates";
import { RegisteredVoters } from "./pages/admin/RegisteredVoters";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route index element={<Landing />} />
			<Route path="/dashboard" element={<DashboardLayout />}>
				<Route index element={<DashboardLanding />} />
				<Route path="voting" element={<Voting />} />
				<Route path="voter-registration" element={<VoterRegistration />} />
				<Route path="candidate-registration" element={<CandidateRegistration />} />
			</Route>
			<Route path="/admin" element={<AdminLayout />}>
				<Route index element={<AdminLanding />} />
				<Route path="voting-results" element={<VotingResults />} />
				<Route path="registered-voters" element={<RegisteredVoters />} />
				<Route path="registered-candidates" element={<RegisteredCandidates />} />
			</Route>
		</Route>
	)
);

export const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};
