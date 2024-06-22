import axios from "axios";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";

interface Candidate {
	_id: string;
	candidateID: number;
	symbolURL: string;
	candidateName: string;
	partyName: string;
}

interface SelectCandidateProps {
	onSelectCandidate: (candidateID: string) => void;
}

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const SelectCandidate: React.FC<SelectCandidateProps> = ({ onSelectCandidate }) => {
	const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
	const [candidates, setCandidates] = useState<Candidate[]>([]);

	const defaultCandidate: Candidate = {
		_id: "default",
		candidateID: 1000000000000,
		symbolURL: "/user-circle.svg",
		candidateName: "Select a Candidate",
		partyName: "Party Name",
	};

	const getCandidates = async () => {
		try {
			const response = await axios.get<Candidate[]>(`${API_ROUTE}/candidates`);
			setCandidates([defaultCandidate, ...response.data]);
			setSelectedCandidate(defaultCandidate);
		} catch (err) {
			alert(`Error fetching candidates: ${err}`);
		}
	};

	useEffect(() => {
		getCandidates();
	}, []);

	const handleSelect = (candidate: Candidate) => {
		setSelectedCandidate(candidate);
		onSelectCandidate(candidate._id); //
	};

	return (
		<Listbox value={selectedCandidate} onChange={handleSelect}>
			{({ open }) => (
				<>
					<Label className="mb-2 block text-sm font-medium">Candidate</Label>
					<div className="relative mt-2">
						<ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm sm:leading-6">
							<span className="flex items-center">
								{selectedCandidate && (
									<img src={selectedCandidate.symbolURL} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
								)}
								<span className="ml-3 block truncate">
									{selectedCandidate
										? `${selectedCandidate.candidateName} - ${selectedCandidate.partyName}`
										: "Select Candidate"}
								</span>
							</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
								<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
							</span>
						</ListboxButton>

						<Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
							<ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{candidates.map((candidate) => (
									<ListboxOption
										key={candidate._id}
										className={({ active }) =>
											clsx(active ? "bg-gray-200 text-black" : "", "relative cursor-default select-none py-2 pl-3 pr-9")
										}
										value={candidate}
									>
										{({ selected }) => (
											<div className="flex items-center">
												<img src={candidate.symbolURL} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
												<span className={clsx(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
													{`${candidate.candidateName} - ${candidate.partyName}`}
												</span>
												{selected && (
													<span className="absolute inset-y-0 right-0 flex items-center pr-4">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												)}
											</div>
										)}
									</ListboxOption>
								))}
							</ListboxOptions>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};
