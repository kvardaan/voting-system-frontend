import axios from "axios";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { useCandidates } from "../../hooks/useCandidates";
import { candidateColumns } from "../../utils/tableColumns";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const RegisteredCandidatesTable = () => {
	const [deletingCandidate, setDeletingCandidate] = useState("");
	const [candidates, loading]: any = useCandidates();

	const handleCandidateDelete = async (id: string) => {
		setDeletingCandidate(id);
		try {
			const response = await axios({
				method: "delete",
				url: `${API_ROUTE}/candidate/${id}`,
			});
			alert(response.data.message);
		} catch (error) {
			alert(`Error: ${error}`);
		} finally {
			setDeletingCandidate("");
		}
	};

	return (
		<div className="mt-6 flow-root">
			<div className="inline-block min-w-full align-center">
				{loading ? (
					<div className="flex my-20 items-center justify-center">
						<span className="animate-spin inline-block h-10 w-10 rounded-full border-b-2 border-black"></span>
					</div>
				) : candidates.length > 0 ? (
					<>
						{/* Table hidden at md breakpoint */}
						{candidates.map((candidate: any) => (
							<div
								key={candidate._id}
								className="md:hidden bg-gray-50 rounded-lg mb-2 p-2 flex-col items-center justify-center"
							>
								<div className="md:mb-2 w-full rounded-md bg-white p-4">
									<div className="flex items-center justify-between gap-1">
										<img
											src={candidate.symbolURL}
											className="rounded-sm w-16 sm:w-28 p-2"
											width={20}
											height={20}
											alt={`${candidate.candidateName}'s Symbol`}
										/>
										<div className="flex flex-col w-56 sm:w-72 items-start justify-center gap-1">
											<p className="text-md sm:text-lg font-bold">{candidate.candidateName}</p>
											<p className="text-md sm:text-lg font-medium px-1 bg-sky-200 bg-opacity-50 rounded-md">
												{candidate.partyName}
											</p>
											<p className="text-md sm:text-lg font-medium">Votes: {candidate.votes}</p>
										</div>
										<div className="w-12 sm:ml-10 items-center">
											<div className="flex items-center justify-center w-1/2">
												<Button
													className="w-10 h-10 flex flex-col items-center justify-center rounded-md bg-red-500 hover:bg-red-700"
													onClick={() => handleCandidateDelete(candidate._id)}
													disabled={deletingCandidate === candidate._id}
												>
													{deletingCandidate === candidate._id ? (
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
						))}
						<div className="flex flex-row justify-center gap-3 items-end md:hidden">
							<p className="text-md sm:text-lg font-medium px-1 bg-sky-200 bg-opacity-50 rounded-md">Party Name</p>
						</div>

						{/* Table shown at md breakpoint */}
						<div className="hidden md:block rounded-lg bg-gray-50 p-2">
							<table className="hidden min-w-full text-gray-900 md:table table-auto">
								<thead className="rounded-lg text-sm font-normal">
									<tr>
										{candidateColumns.map((column) => (
											<th key={column.header} scope="col" className="px-4 py-5 font-medium text-center">
												{column.header}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="bg-white mx-3">
									{candidates.map((candidate: any) => (
										<tr
											key={candidate._id}
											className="w-full h-20 border-b py-3 text-sm text-center last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
										>
											<td className="whitespace-nowrap w-72 px-3 py-3">{candidate.candidateName}</td>
											<td className="whitespace-nowrap w-60 px-3 py-3">{candidate.partyName}</td>
											<td className="whitespace-nowrap w-40 py-3 pl-6 pr-3">
												<div className="flex items-center justify-center">
													<img
														src={candidate.symbolURL}
														className="rounded-sm p-1"
														width={50}
														height={50}
														alt={`${candidate.candidateName}'s Symbol`}
													/>
												</div>
											</td>
											<td className="whitespace-nowrap w-24 px-3 py-3">{candidate.votes}</td>
											<td className="whitespace-nowrap w-10 py-3 px-6">
												<div className="flex justify-center items-center">
													<Button
														className="flex flex-col items-center justify-center rounded-md w-10 bg-red-500 hover:bg-red-700"
														onClick={() => handleCandidateDelete(candidate._id)}
														disabled={deletingCandidate === candidate._id}
													>
														{deletingCandidate === candidate._id ? (
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
						<p className="text-md font-normal">No candidates registered.</p>
					</div>
				)}
			</div>
		</div>
	);
};
