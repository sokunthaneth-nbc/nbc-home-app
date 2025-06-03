// components/LoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Fingerprint } from "lucide-react";
import RegisterBiometric from "@/components/RegisterBiometric";
import LoginBiometric from "@/components/VerifyBiometric";
import axios from "axios";
import { setAcccessToken } from "@/lib/auth";
import { validateForm } from "../utils/validation";

export default function LoginPage() {
	const router = useRouter();

	const defaultStaffId = "2530";
	const defaultPassword = "123456";

	const [staffId, setStaffId] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ staffId?: string; password?: string }>({});

	//Function Validate
	// const validate = () => {
	// 	const newErrors: { staffId?: string; password?: string } = {};

	// 	if (!staffId.trim()) {
	// 		newErrors.staffId = "សូមបញ្ចូលលេខសម្គាល់ NBC";
	// 	} else if (!/^[a-zA-Z0-9]+$/.test(staffId)) {
	// 		newErrors.staffId = "លេខសម្គាល់ NBC តំរូវជា លេខ";
	// 	} else if (staffId.length !== 4) {
	// 		newErrors.staffId = "លេខសម្គាល់ NBC ត្រូវមាន ៤ តួអក្សរ";
	// 	}

	// 	if (!password.trim()) {
	// 		newErrors.password = "សូមបញ្ចូលលេខសម្ងាត់";
	// 	} else if (password.length < 6) {
	// 		newErrors.password = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ";
	// 	}

	// 	setErrors(newErrors);
	// 	return Object.keys(newErrors).length === 0;
	// };

	//Function Login
	// const handleLogin = (e: React.FormEvent) => {
	// 	e.preventDefault();

	// 	if (!validate()) return;

	// 	const isStaffIdCorrect = staffId === defaultStaffId;
	// 	const isPasswordCorrect = password === defaultPassword;

	// 	if (isStaffIdCorrect && isPasswordCorrect) {
	// 		router.push("/change-password");
	// 	} else {
	// 		const newErrors: { staffId?: string; password?: string } = {};

			// if (!isStaffIdCorrect && !isPasswordCorrect) {
			// 	newErrors.staffId = "អ្នកប្រើប្រាស់មិនមានទេ"; // both wrong
			// 	newErrors.password = "ពាក្យសម្ងាត់មិនត្រឹមត្រូវ";
			// } else if (!isStaffIdCorrect) {
			// 	newErrors.staffId = "អ្នកប្រើប្រាស់មិនមានទេ"; // wrong ID only
			// } else if (!isPasswordCorrect) {
			// 	newErrors.password = "អ្នកបានបញ្ចូលពាក្យសម្ងាត់ខុស"; // wrong password only
			// }

	// 		setErrors(newErrors); // only one setErrors call
	// 	}
	// };

	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		const { valid, errors } = validateForm(
			staffId,
			password
		);
		setErrors(errors);
		//console.log(errors,'error');
		if (!valid) {
			return;
		}

		try {
			setIsLoading(true);

			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
				staff_id: staffId,
				password: password,
			});
			
			//console.log("Response data:", response.data); // Debug log

			const token = response?.data?.data?.access_token;
			const userId = response?.data?.data?.staff_id;
			const userStatusCode = response?.data?.status?.code; // Get the user's status
			const invalidCredentials = response?.data?.status?.message;
			const userReqiureChangePwd = response?.data?.data?.status;

			//check Invaild user
			if (userStatusCode === 1) {
				if (invalidCredentials === "Invalid email or password") {
					setErrors({ staffId: "ពត៍មានមិនត្រឹមត្រូវ", password: "ពត៍មានមិនត្រឹមត្រូវ" });				}
				return;
			}

			//Set Toaken and Staff_is to local storage
			setAcccessToken(token);
			localStorage.setItem("staff_id",userId);

			//check user required to change password or not
			if(userReqiureChangePwd === 'UPDATE_PW_REQUIRED'){
				router.push("/home");
			}else{
				router.push("/change-password");
			}

		} catch (error) {
			console.error("Login failed:", error);
		}finally {
			setIsLoading(false); // always reset loading no matter what
		}
	};

	//check Tying
	const hasTyped = staffId !== "" || password !== "";

	return (
		<section className="bg-white dark:bg-[#001346] min-h-screen flex flex-col justify-between">
			<div className="w-full  px-6 py-8 flex-1 overflow-auto">
				<p className="text-base font-normal text-[#040e28] dark:text-white">សូមស្វាគមន៍មកកាន់</p>
				<h1 className="text-[26px] my-[15px] font-semibold leading-tight tracking-tight text-[#040e28] dark:text-white">
					កម្មវិធីធនាគារជាតិនៃកម្ពុជា
				</h1>
				<p className="text-base font-normal text-[#040e28] dark:text-white">
					អ្នកអាចពិនិត្យមើលការចូលរួមរបស់អ្នក គ្រប់គ្រងព័ត៌មានរបស់អ្នក
				</p>

				<form className="space-y-6 pt-6 pb-32" onSubmit={handleLogin}>
					{/* Staff ID */}
					<div>
						<label htmlFor="staffId" className="block mb-2 text-sm font-normal text-[#040e28] dark:text-white">
							លេខសម្គាល់ NBC <span className="text-red-600">*</span>
						</label>
						<input autoComplete="off"
							type="text"
							id="staffId"
							inputMode="numeric"
							pattern="\d*"
							value={staffId}
							onChange={(e) => {
								const onlyNumbers = e.target.value.replace(/\D/g, "");
								setStaffId(onlyNumbers);
							}}
							className={`bg-white dark:bg-white text-gray-900 dark:text-[#001346] border ${
								errors.staffId ? "border-red-500" : "border-gray-300 dark:border-gray-600"
							} h-[56px] p-[16px] rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
						/>
						{errors.staffId && (
							<p className="text-sm text-red-600 mt-1">{errors.staffId}</p>
						)}
					</div>

					{/* Password */}
					<div>
						<label htmlFor="password" className="block mb-2 text-sm font-normal text-[#040e28] dark:text-white">
							ពាក្យសម្ងាត់ <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input autoComplete="off"
								type={showPassword ? "text" : "password"}
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`bg-white dark:white text-gray-900 dark:text-[#001346] border ${
									errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
								} h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute bottom-[19px] right-3 text-gray-500  hover:text-gray-700 dark:text-[#001346] dark:hover:text-white"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && (
							<p className="text-sm text-red-600 mt-1">{errors.password}</p>
						)}
					</div>

					
					<RegisterBiometric/>
					<LoginBiometric/>
					{/* Submit Button at Bottom */}
					<div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#001346] p-4">
						<button
							type="submit"
							disabled={isLoading}
							className={`w-full text-white h-[40px] px-[16px] py-[8px] bg-[#0f4aea] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[32px] text-[16px] font-[600] text-center flex justify-center items-center gap-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							{isLoading ? "កំពុងត្រួតពិនិត្យ..." : hasTyped ? (
								"ចូលទៅកាន់ប្រព័ន្ធ"
							) : (
								<>
									ចូលទៅកាន់ប្រព័ន្ធជាមួយ Bio <Fingerprint size={20} />
								</>
							)}
						</button>
					</div>
				</form>
				
			</div>
		</section>
	);
}