import axios from "axios";
import { useState } from "react";
import { CheckCircleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { voterColumns } from "../../utils/tableColumns";
import { useVoters } from "../../hooks/useVoters";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const RegisteredVotersTable = () => {
	const [voters, loading]: any = useVoters();
	const [deletingVoter, setDeletingVoter] = useState(0);

	const handleVoterDelete = async (aadhaarNumber: number) => {
		setDeletingVoter(aadhaarNumber);
		try {
			const response = await axios({
				method: "delete",
				url: `${API_ROUTE}/voter/${aadhaarNumber}`,
			});
			alert(response.data.message);
		} catch (error) {
			alert(`Error: ${error}`);
		} finally {
			setDeletingVoter(0);
		}
	};

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-center">
				{loading ? (
					<div className="flex my-20 items-center justify-center">
						<span className="animate-spin inline-block h-10 w-10 rounded-full border-b-2 border-black"></span>
					</div>
				) : voters.length > 0 ? (
					<>
						{/* Table hidden at md breakpoint */}
						{voters?.map((voter: any) => (
							<div className="md:hidden bg-gray-50 rounded-lg mb-2 p-2 flex-col items-center justify-center">
								<div key={voter.id} className="md:mb-2 w-full rounded-md bg-white p-4">
									<div className="text-wrap">
										<div className="flex items-center justify-between gap-1">
											<img
												src={voter.pictureURL}
												className="rounded-md w-12 sm:w-20 p-0.5 mr-2 bg-gray-100"
												width={15}
												height={20}
												alt={`${voter.fullName}'s Symbol`}
											/>
											<div className="flex flex-col w-48 sm:w-full items-start gap-1">
												<div className="flex flex-row items-center justify-center gap-2">
													<p className="text-md sm:text-lg font-bold">{voter.fullName}</p>
													<p className="text-md sm:text-lg font-medium">
														{voter.votingStatus ? (
															<CheckCircleIcon className="w-5 h-5 text-green-800" />
														) : (
															<XCircleIcon className="w-5 h-5 text-red-800" />
														)}
													</p>
												</div>
												<p className="text-md sm:text-lg font-medium px-1 bg-stone-200 bg-opacity-50 rounded-md">
													{voter.aadhaarNumber}
												</p>
												<p className="text-md sm:text-lg font-medium px-1 bg-amber-200 bg-opacity-50 rounded-md">
													{voter.voterID}
												</p>
											</div>
											<div className="w-12 sm:ml-10 items-center">
												<div className="flex items-end justify-right w-1/2">
													<Button
														className="w-10 h-10 flex flex-col items-center justify-center rounded-md bg-red-500 hover:bg-red-700"
														onClick={() => handleVoterDelete(voter.aadhaarNumber)}
														disabled={deletingVoter === voter.aadhaarNumber}
													>
														{deletingVoter === voter.aadhaarNumber ? (
															<span className="animate-spin inline-block h-5 w-5 rounded-full border-b-2 border-white"></span>
														) : (
															<TrashIcon className="w-5 h-5" />
														)}
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
						<div className="flex flex-row justify-center gap-3 items-end md:hidden">
							<p className="text-md sm:text-lg font-medium px-1 bg-stone-200 bg-opacity-50 rounded-md">AadhaarNumber</p>
							<p className="text-md sm:text-lg font-medium px-1 bg-amber-200 bg-opacity-50 rounded-md">Voter ID</p>
						</div>
						{/* <div className="pt-2 text-md flex flex-row justify-center sm:text-lg font-medium px-1 rounded-md">
							<p className="text-md sm:text-lg font-medium px-1 bg-emerald-200 bg-opacity-50 rounded-md">Voting Status</p>
							<CheckCircleIcon className="w-6 h-6 text-green-800" />
							<XCircleIcon className="w-6 h-6 text-red-800" />
						</div> */}

						{/* Table shown at md breakpoint */}
						<div className="hidden md:block rounded-lg bg-gray-50 p-2">
							<table className="hidden min-w-full text-gray-900 md:table table-auto">
								<thead className="rounded-lg text-sm font-normal">
									<tr>
										{voterColumns.map((column) => {
											return (
												<th key={column.header} scope="col" className="px-4 py-5 font-medium text-center">
													{column.header}
												</th>
											);
										})}
									</tr>
									{/* <p className="mb-2"></p> */}
								</thead>
								<tbody className="bg-white mx-3">
									{voters?.map((voter: any) => (
										<tr
											key={voter._id}
											className="w-full h-20 border-b py-3 text-sm text-center last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
										>
											<td className="whitespace-nowrap w-80 px-3 py-3">{voter.fullName}</td>
											<td className="whitespace-nowrap w-56 px-3 py-3">{voter.aadhaarNumber}</td>
											<td className="whitespace-nowrap w-56 px-3 py-3">{voter.voterID}</td>
											<td className="whitespace-nowrap w-40 py-3 pl-6 pr-3">
												<div className="flex items-center justify-center">
													<img
														src={voter.pictureURL}
														className="rounded-md border-0"
														width={75}
														height={75}
														alt={`${voter.fullName}'s Picture`}
													/>
												</div>
											</td>
											<td className="whitespace-nowrap w-24 px-3 py-3">
												<div className="flex justify-center items-center">
													{voter.votingStatus ? (
														<CheckCircleIcon className="w-10 h-10 text-green-700" />
													) : (
														<XCircleIcon className="w-10 h-10 text-red-700" />
													)}
												</div>
											</td>
											<td className="whitespace-nowrap w-10 py-3 px-6">
												<div className="flex justify-center items-center">
													<Button
														className="w-10 h-10 flex flex-col items-center justify-center rounded-md bg-red-500 hover:bg-red-700"
														onClick={() => handleVoterDelete(voter.aadhaarNumber)}
														disabled={deletingVoter === voter.aadhaarNumber}
													>
														{deletingVoter === voter.aadhaarNumber ? (
															<span className="animate-spin inline-block h-5 w-5 rounded-full border-b-2 border-white"></span>
														) : (
															<TrashIcon className="w-5 h-5" />
														)}
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				) : (
					<div className="flex items-center justify-center">
						<p className="text-md font-normal">No voters registered.</p>
					</div>
				)}
			</div>
		</div>
	);
};
