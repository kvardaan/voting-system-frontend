import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { HashtagIcon, PhotoIcon, TagIcon } from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { candidateValidationSchema } from "../../utils/validationSchema";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const CandidateRegistrationForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
	} = useForm({
		resolver: yupResolver(candidateValidationSchema),
	});
	const [candidateSymbol, setCandidateSymbol]: any = useState(null);
	const navigate = useNavigate();

	const handleImageChange = (event: any) => {
		const file = event.target.files[0];
		setCandidateSymbol(file);
		setValue("imageFile", file);
	};

	const onSubmit = async (data: any) => {
		const formData = new FormData();
		formData.append("candidateName", data.candidateName);
		formData.append("partyName", data.partyName);
		formData.append("imageFile", candidateSymbol);

		try {
			const response = await axios({
				method: "post",
				url: `${API_ROUTE}/candidate`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			alert(`${response.data.message}`);
			navigate("/dashboard");
		} catch (error: any) {
			alert(`Error: ${error.message}`);
			navigate("/dashboard/candidate-registration");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Name */}
				<div className="mb-4">
					<label htmlFor="candidateName" className="mb-2 block text-sm font-medium">
						Name
					</label>
					<div className="relative">
						<input
							id="candidateName"
							type="text"
							placeholder="Enter Full Name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							{...register("candidateName")}
						/>
						<TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500" />
					</div>
					{errors.candidateName && <div className="mt-2 text-sm text-red-500">{errors.candidateName.message}</div>}
				</div>

				{/* Party Name */}
				<div className="mb-4">
					<label htmlFor="partyName" className="mb-2 block text-sm font-medium">
						Party Name
					</label>
					<div className="relative">
						<input
							id="partyName"
							type="text"
							placeholder="Enter Party Name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							{...register("partyName")}
						/>
						<HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500" />
					</div>
					{errors.partyName && <div className="mt-2 text-sm text-red-500">{errors.partyName.message}</div>}
				</div>

				{/* Candidate Symbol */}
				<div className="mb-4 flex flex-col justify-around">
					<label htmlFor="imageFile" className="mb-2 block text-sm font-medium">
						Candidate Symbol
					</label>
					<div className="relative">
						<input
							id="imageFile"
							type="file"
							accept="image/png, image/jpeg"
							className="peer block w-full rounded-md bg-white border border-gray-200 py-2 pl-10 text-sm outline-2 text-gray-500 appearance-none"
							{...register("imageFile")}
							onChange={handleImageChange}
						/>
						<PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500" />
					</div>
				</div>

				{/* Display selected image */}
				{candidateSymbol && (
					<div className="bg-white py-3 border rounded-md flex items-center justify-center mt-4">
						<img
							src={URL.createObjectURL(candidateSymbol)}
							alt="Selected"
							width={200}
							height={200}
							className="max-w-full h-auto"
						/>
					</div>
				)}

				{/* Buttons */}
				<div className="mt-6 flex flex-row justify-center gap-4 lg:justify-end">
					<NavLink
						to="/dashboard"
						className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
					>
						Cancel
					</NavLink>
					<Button
						className={`rounded-lg text-sm font-medium ${isSubmitting ? "bg-black" : ""}`}
						type="submit"
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<span className="animate-spin inline-block h-5 w-5 rounded-full border-b-2 border-white"></span>
						) : (
							"Register"
						)}
					</Button>
				</div>
			</div>
		</form>
	);
};
