import axios from "axios";
import Webcam from "react-webcam";
import { useForm } from "react-hook-form";
import { useCallback, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { CameraIcon, HashtagIcon, TagIcon } from "@heroicons/react/24/outline";

import { Button } from "../Button";
import { voterValidationSchema } from "../../utils/validationSchema";

const API_ROUTE = import.meta.env.VITE_API_ROUTE;

export const VoterRegistrationForm = () => {
	const webcamRef: any = useRef(null);
	const [imgSrc, setImgSrc]: any = useState(null);
	const [showWebcam, setShowWebcam] = useState(false);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
	}, [webcamRef]);

	const retake = () => {
		setImgSrc(null);
	};

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(voterValidationSchema),
	});
	const navigate = useNavigate();

	const onSubmit = async (data: any) => {
		const formData = new FormData();
		formData.append("fullName", data.fullName);
		formData.append("aadhaarNumber", data.aadhaarNumber);
		formData.append("base64Data", imgSrc);

		try {
			const response = await axios({
				method: "post",
				url: `${API_ROUTE}/voter`,
				data: formData,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			alert(`${response.data.message}`);
			navigate("/dashboard");
		} catch (error: any) {
			alert(`Error: ${error.message}`);
			navigate("/dashboard/voter-registration");
		}
	};

	const handleAddFaceID = () => {
		setShowWebcam(true);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Name */}
				<div className="mb-4">
					<label htmlFor="fullName" className="mb-2 block text-sm font-medium">
						Name
					</label>
					<div className="relative">
						<input
							id="fullName"
							type="text"
							placeholder="Enter Full Name"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							{...register("fullName")}
						/>
						<TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500" />
					</div>
					{errors.fullName && <div className="mt-2 text-sm text-red-500">{errors.fullName.message}</div>}
				</div>

				{/* Aadhaar Number */}
				<div className="mb-4">
					<label htmlFor="aadhaarNumber" className="mb-2 block text-sm font-medium">
						Aadhaar Number
					</label>
					<div className="relative">
						<input
							id="aadhaarNumber"
							type="text"
							placeholder="Enter Aadhaar Number"
							className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
							{...register("aadhaarNumber")}
						/>
						<HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[16px] w-[16px] -translate-y-1/2 text-gray-500" />
					</div>
					{errors.aadhaarNumber && <div className="mt-2 text-sm text-red-500">{errors.aadhaarNumber.message}</div>}
				</div>

				{/* Verification */}
				<div className="mb-4 flex flex-col justify-around">
					<label htmlFor="face" className="mb-2 block text-sm font-medium">
						For Verification
					</label>
					<div>
						<div className="flex flex-row items-center justify-evenly">
							<div>
								<Button
									id="imageFile"
									type="button"
									className="flex flex-row items-center justify-center rounded-md h-9 gap-2"
									onClick={handleAddFaceID}
									{...register("base64Data")}
								>
									<CameraIcon className="hidden md:block pointer-events-none top-1/2 h-5 w-5" />
									<p className="text-sm md:text-base">Add Face ID</p>
								</Button>
							</div>
						</div>
					</div>
				</div>

				<input type="text" id="base64Data" hidden {...register("base64Data")} />

				{showWebcam && (
					<div className="container flex flex-col items-center justify-center">
						{imgSrc ? (
							<img src={imgSrc} id="base64Data" alt="webcam" className="rounded-lg" {...register("base64Data")} />
						) : (
							<Webcam
								height={250}
								width={250}
								ref={webcamRef}
								mirrored={true}
								screenshotQuality={0.9}
								screenshotFormat="image/jpeg"
								className="rounded-lg"
							/>
						)}
						<div className="btn-container mt-4">
							{imgSrc ? (
								<Button
									type="button"
									className="flex items-center justify-center rounded-md h-8 w-20 text-sm"
									onClick={retake}
								>
									Retake
								</Button>
							) : (
								<Button
									type="button"
									className="flex items-center justify-center rounded-md h-8 w-20 text-sm"
									onClick={capture}
								>
									Capture
								</Button>
							)}
						</div>
					</div>
				)}

				{/* Buttons */}
				<div className="mt-6 flex justify-center gap-4 lg:justify-end">
					<NavLink
						to="/dashboard"
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Cancel
					</NavLink>
					<Button className={`rounded-lg ${isSubmitting ? "bg-black" : ""}`} type="submit" disabled={isSubmitting}>
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
