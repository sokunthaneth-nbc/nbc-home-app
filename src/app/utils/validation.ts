// Validation
export const validateForm = (staffId: string, password: string) => {
	let valid = true;
	const errors = { staffId: "", password: "" };

	if (!staffId) {
		errors.staffId = "សូមបញ្ចូលលេខសម្គាល់ NBC";
		valid = false;
	} 
	
	
	// else if (!/^[a-zA-Z0-9]+$/.test(staffId)) {
	// 		errors.staffId = "លេខសម្គាល់ NBC តំរូវជា លេខ";
	// } else if (staffId.length !== 4) {
	// 	errors.staffId = "លេខសម្គាល់ NBC ត្រូវមាន ៤ តួអក្សរ";
	// }

	if (!password) {
		errors.password = "សូមបញ្ចូលលេខសម្ងាត់";
		valid = false;
	} 
	
	
	// else if (password.length < 6) {
	// 	errors.password = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ";
	// 	valid = false;
	// } else if (!/[a-z]/.test(password)) {
	// 	errors.password = "ពាក្យសម្ងាត់ត្រូវមាន អក្សរ យ៉ាងហោចណាស់មួយ";
	// 	valid = false;
	// } else if (!/[0-9]/.test(password)) {
	// 	errors.password = "ពាក្យសម្ងាត់ត្រូវមាន លេខ យ៉ាងហោចណាស់មួយ";
	// 	valid = false;
	// } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
	// 	errors.password = "ពាក្យសម្ងាត់ត្រូវមាន អក្សរពិសេស យ៉ាងហោចណាស់មួយ";
	// 	valid = false;
	// }
	return { valid, errors };
};