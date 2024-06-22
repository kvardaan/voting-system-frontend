import { NavLink } from "react-router-dom";

import NavLinks from "../admin/NavLinks";

export default function SideNav() {
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<NavLink
				to="/"
				className="mb-2 flex h-24 items-center justify-center rounded-md bg-gray-50 p-4 md:h-40 hover:bg-neutral-200"
			>
				<div className="w-32 flex items-center justify-center text-white md:w-40 hover:scale-105 hover:transition hover:duration-500 hover:ease-in-out">
					<img src="/admin.svg" alt="Logo" height={75} width={75} className="md:h-3/5 md:w-3/5" />
				</div>
			</NavLink>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden md:block h-auto w-full grow rounded-md bg-gray-50"></div>
			</div>
		</div>
	);
}
