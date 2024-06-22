import clsx from "clsx";
import { NavLink, useLocation } from "react-router-dom";
import { UserCircleIcon, UsersIcon, HomeIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";

const links = [
	{ name: "Home", href: "/dashboard", icon: HomeIcon },
	{
		name: "Voting",
		href: "/dashboard/voting",
		icon: InboxArrowDownIcon,
	},
	{ name: "Voter Registration", href: "/dashboard/voter-registration", icon: UserCircleIcon },
	{ name: "Candidate Registration", href: "/dashboard/candidate-registration", icon: UsersIcon },
];

export default function NavLinks() {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<NavLink
						key={link.name}
						to={link.href}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-neutral-200 md:flex-none md:justify-start md:p-2 md:px-3",
							{
								"bg-neutral-200": pathname === link.href,
							}
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</NavLink>
				);
			})}
		</>
	);
}
