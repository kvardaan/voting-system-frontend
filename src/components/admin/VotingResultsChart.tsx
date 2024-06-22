import axios from "axios";
import { useEffect, useState } from "react";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const VotingResultsChart = () => {
	const [winner, setWinner]: any = useState(null);
	const [message, setMessage]: any = useState("");
	const [loading, setLoading] = useState(false);

	const getResults = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 300));

			const response = await axios({
				method: "get",
				url: `${API_ROUTE}/votes`,
			});
			setWinner(response.data.winner);
			setMessage(response.data.message);
		} catch (error) {
			alert(`Error: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getResults();
	}, []);

	return (
		<div className="flex flex-row items-center justify-center">
			{loading ? (
				<div className="flex my-20 items-center justify-center">
					<span className="animate-spin inline-block h-10 w-10 rounded-full border-b-2 border-black"></span>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center sm:flex-row gap-2">
					{message ? (
						<div>
							<p className="font-medium bg-emerald-100 px-2 py-1 mb-2 rounded-md">{message}</p>
							{winner ? (
								<div key={winner._id} className="bg-gray-200 rounded-lg p-2 items-center justify-center">
									<div className="rounded-md bg-white p-1">
										<div className="flex items-center justify-between gap-1">
											<img
												src={winner.symbolURL}
												className="rounded-sm w-12 sm:w-20 p-1"
												width={15}
												height={15}
												alt={`${winner.candidateName}'s Symbol`}
											/>
											<div className="flex flex-col w-40 sm:w-54 items-start justify-center gap-1">
												<p className="text-sm font-bold">{winner.candidateName}</p>
												<p className="text-sm font-medium px-1 bg-sky-200 bg-opacity-50 rounded-md">{winner.partyName}</p>
												<p className="text-sm font-medium">Votes: {winner.votes}</p>
											</div>
										</div>
									</div>
								</div>
							) : (
								""
							)}
							<p className="w-full p-2 text-center">
								<span className="bg-red-200 rounded-md px-2 py-1">Chart comes here!</span>
							</p>
						</div>
					) : (
						<p className="font-medium bg-red-100 px-2 py-1 rounded-md">No votes have been cast yet!</p>
					)}
				</div>
			)}
		</div>
	);
};
