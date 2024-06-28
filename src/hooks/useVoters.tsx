import axios from "axios";
import { useState, useEffect } from "react";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const useVoters = () => {
	const [voters, setVoters] = useState([]);
	const [loading, setLoading] = useState(false);

	const getResults = async () => {
		setLoading(true);
		try {
			await new Promise((resolve) => setTimeout(resolve, 500));
			const response = await axios({
				method: "get",
				url: `${API_ROUTE}/voters`,
			});

			setVoters(response.data);
		} catch (error) {
			alert(`Error fetching results: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getResults();
	}, []);

	return [voters, loading, getResults];
};
