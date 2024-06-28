import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

// Options for the chart
const options: Chart.ChartOptions<"pie"> = {
	responsive: true,
	plugins: {
		legend: {
			position: "bottom" as const, // Ensure position is of the correct type
		},
		tooltip: {
			callbacks: {
				label: function (tooltipItem: any) {
					if (tooltipItem.raw) {
						return `${tooltipItem.label}: ${tooltipItem.raw} votes`;
					}
					return "";
				},
			},
		},
	},
};

// Define the PieChart component
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
	// Process the data
	const votes = data.map((candidate) => candidate.votes);
	const labels = data.map((candidate) => `${candidate.candidateName} (${candidate.partyName})`);

	// Generate random colors for the chart slices
	const colors = generateColors(data.length);

	// Function to generate random colors
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

	// Data for the chart
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
