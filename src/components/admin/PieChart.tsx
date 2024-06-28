import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js/auto";

Chart.register(ArcElement, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom" as const,
		},
		tooltip: {
			callbacks: {
				label: function (tooltipItem: any) {
					if (tooltipItem.raw) {
						return `Votes: ${tooltipItem.raw}`;
					}
					return "";
				},
			},
		},
	},
};

interface Props {
	data: {
		_id: string;
		candidateName: string;
		candidateID: number;
		partyName: string;
		symbolURL: string;
		votes: number;
		__v: number;
	}[];
}

const PieChart: React.FC<Props> = ({ data }) => {
	const votes = data.map((candidate) => candidate.votes);
	const labels = data.map((candidate) => `${candidate.candidateName} (${candidate.partyName})`);

	const colors = generateColors(data.length);

	function generateColors(numColors: number) {
		const colors: string[] = [];
		for (let i = 0; i < numColors; i++) {
			const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
				Math.random() * 256
			)}, 0.7)`;
			colors.push(color);
		}
		return colors;
	}

	const chartData = {
		labels: labels,
		datasets: [
			{
				data: votes,
				backgroundColor: colors,
				hoverBackgroundColor: colors,
			},
		],
	};

	return (
		<div>
			<Pie data={chartData} options={options} />
		</div>
	);
};

export default PieChart;
