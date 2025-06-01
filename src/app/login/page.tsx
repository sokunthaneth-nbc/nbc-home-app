// components/LoginPage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();

	const defaultStaffId = "2530";
	const defaultPassword = "123456";

	const [staffId, setStaffId] = useState("2530");
	const [password, setPassword] = useState("123456");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ staffId?: string; password?: string }>({});

	const validate = () => {
		const newErrors: { staffId?: string; password?: string } = {};

		if (!staffId.trim()) {
			newErrors.staffId = "NBC ID is required.";
		} else if (!/^[a-zA-Z0-9]+$/.test(staffId)) {
			newErrors.staffId = "NBC ID must be alphanumeric.";
		}

		if (!password.trim()) {
			newErrors.password = "Password is required.";
		} else if (password.length < 6) {
			newErrors.password = "Password must be at least 6 characters.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) return;

		if (staffId === defaultStaffId && password === defaultPassword) {
			router.push("/change-password");
		} else {
			setErrors({ password: "Invalid NBC ID or password." });
		}
	};

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
						<input
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
							<input
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

					{/* Submit Button */}
					<div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#001346] p-4 border-t border-gray-200 dark:border-gray-700">
						<button
							type="submit"
							className="w-full text-white dark:bg-white dark:text-[#001346] bg-[#0f4aea] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[32px] text-base px-4 py-4 text-center"
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}