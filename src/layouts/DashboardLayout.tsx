import { Outlet } from "react-router-dom";

import SideNav from "../components/dashboard/SideNav";

export const DashboardLayout = () => {
	return (
		<div>
			<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
				<div className="w-full flex-none md:w-64">
					<SideNav />
				</div>
				<div className="flex-grow p-6 md:overflow-y-auto md:p-12">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
