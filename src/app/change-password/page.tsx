"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
	const router = useRouter();

	const [newPassword, setNewPassword] = useState("myInitialPassword");
	const [confirmPassword, setConfirmPassword] = useState("myInitialPassword");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

	const validate = () => {
		const newErrors: { newPassword?: string; confirmPassword?: string } = {};

		if (!newPassword.trim()) {
			newErrors.newPassword = "New password is required.";
		} else if (newPassword.length < 6) {
			newErrors.newPassword = "Password must be at least 6 characters.";
		}

		if (!confirmPassword.trim()) {
			newErrors.confirmPassword = "Confirm password is required.";
		} else if (confirmPassword !== newPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;

		// Here you would normally make an API call to update the password.
		// For now, we'll just redirect:
		router.push("/home");
	};

	return (
		<section className="bg-gray-50 min-h-screen flex flex-col justify-between">
			<div className="w-full bg-white px-6 py-8 flex-1 overflow-auto">
				<p className="text-base font-normal text-[#040e28]">សូមស្វាគមន៍</p>
				<h1 className="text-[26px] my-[15px] font-semibold leading-tight tracking-tight text-[#040e28]">
					ផ្លាស់ប្តូរពាក្យសម្ងាត់របស់អ្នក
				</h1>
				<p className="text-base font-normal text-[#040e28]">
					នេះជាលើកដំបូងរបស់អ្នក សូមបង្កើតពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក
				</p>

				<form className="space-y-6 pt-6 pb-32" onSubmit={handleChangePassword}>
					{/* New Password */}
					<div>
						<label htmlFor="newPassword" className="block mb-2 text-sm font-normal text-[#040e28]">
							ពាក្យសម្ងាត់ថ្មី <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className={`bg-gray-50 border ${
									errors.newPassword ? "border-red-500" : "border-gray-300"
								} h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute bottom-[19px] right-3 text-gray-500 hover:text-gray-700"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.newPassword && (
							<p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>
						)}
					</div>

					{/* Confirm New Password */}
					<div>
						<label htmlFor="confirmPassword" className="block mb-2 text-sm font-normal text-[#040e28]">
							បញ្ជាក់ពាក្យសម្ងាត់ថ្មី <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className={`bg-gray-50 border ${
									errors.confirmPassword ? "border-red-500" : "border-gray-300"
								} h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute bottom-[19px] right-3 text-gray-500 hover:text-gray-700"
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
						)}
					</div>

					{/* Submit Button at Bottom */}
					<div className="fixed bottom-0 left-0 w-full bg-white p-4">
						<button
							type="submit"
							className="w-full text-white bg-[#0f4aea] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-[32px] text-base px-4 py-4 text-center"
						>
							Next
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}