import * as Yup from "yup";

export const candidateValidationSchema = Yup.object().shape({
	candidateName: Yup.string()
		.required("Candidate Name cannot be empty.")
		.min(6, "Name should be at least 6 characters long.")
		.max(50, "Name cannot be more than 50 characters."),
	partyName: Yup.string()
		.required("Party Name cannot be empty.")
		.min(3, "Party Name should be at least 3 characters long.")
		.max(50, "Party Name cannot be more than 50 characters."),
	imageFile: Yup.mixed().required("Candidate Symbol is required."),
});

export const voterValidationSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Name cannot be empty.")
		.min(6, "Name should be at least 6 characters long.")
		.max(50, "Name cannot be more than 50 characters."),
	aadhaarNumber: Yup.string()
		.required("Aadhaar Number cannot be empty.")
		.matches(/^\d{12}$/, "Aadhaar Number must be exactly 12 digits long.")
		.test("length", "Aadhaar Number must be exactly 12 digits long.", (val) => val.length === 12),
	base64Data: Yup.mixed().required("Voter's Face ID is required."),
});

export const votingValidationSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Name cannot be empty.")
		.min(6, "Name should be at least 6 characters long.")
		.max(50, "Name cannot be more than 50 characters."),
	aadhaarNumber: Yup.string()
		.required("Aadhaar Number cannot be empty.")
		.matches(/^\d{12}$/, "Aadhaar Number must be exactly 12 digits long.")
		.test("length", "Aadhaar Number must be exactly 12 digits long.", (val) => val.length === 12),
	voterID: Yup.string()
		.required("Voter ID cannot be empty.")
		.matches(/^\d{13}$/, "Voter ID must be exactly 13 digits long.")
		.test("length", "Voter ID must be exactly 13 digits long.", (val) => val.length === 13),
	imageFile: Yup.mixed().required("Candidate Symbol is required."),
	candidateID: Yup.string(),
});
