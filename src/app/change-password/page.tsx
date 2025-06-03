"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
	const router = useRouter();

	const [newPassword, setNewPassword] = useState("myInitialPassword");
	const [confirmPassword, setConfirmPassword] = useState("myInitialPassword");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

	const validate = () => {
		const newErrors: { newPassword?: string; confirmPassword?: string } = {};

		if (!newPassword.trim()) {
			newErrors.newPassword = "សូមបញ្ចូលលេខសម្ងាត់";
		} else if (newPassword.length < 6) {
			newErrors.newPassword = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ";
		}

		if (!confirmPassword.trim()) {
			newErrors.confirmPassword = "សូមបញ្ចូលលេខសម្ងាត់ ម្តងទៀត";
		} else if (confirmPassword !== newPassword) {
			newErrors.confirmPassword = "ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChangePassword = (e: React.FormEvent) => {
		e.preventDefault();
		if (!validate()) return;
		router.push("/home");
	};

	return (
		<section className="bg-white dark:bg-[#001346] min-h-screen flex flex-col justify-between">
			<div className="w-full px-6 py-8 flex-1 overflow-auto">
				<p className="text-base font-normal text-[#040e28] dark:text-white">សូមស្វាគមន៍</p>
				<h1 className="text-[26px] my-[15px] font-semibold leading-tight tracking-tight text-[#040e28] dark:text-white">
					ផ្លាស់ប្តូរពាក្យសម្ងាត់របស់អ្នក
				</h1>
				<p className="text-base font-normal text-[#040e28] dark:text-white">
					នេះជាលើកដំបូងរបស់អ្នក សូមបង្កើតពាក្យសម្ងាត់ថ្មីសម្រាប់គណនីរបស់អ្នក
				</p>

				<form className="space-y-6 pt-6 pb-32" onSubmit={handleChangePassword}>
					{/* New Password */}
					<div>
						<label htmlFor="newPassword" className="block mb-2 text-sm font-normal text-[#040e28] dark:text-white">
							ពាក្យសម្ងាត់ថ្មី <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input
								type={showNewPassword ? "text" : "password"}
								id="newPassword"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className={`bg-white dark:bg-white border ${
									errors.newPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
								} text-gray-900 dark:text-[#001346] h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
							/>
							<button
								type="button"
								onClick={() => setShowNewPassword((prev) => !prev)}
								className="absolute bottom-[19px] right-3 text-gray-500 dark:text-[#001346] hover:text-gray-700 dark:hover:text-white"
								tabIndex={-1}
								aria-label="Toggle new password visibility"
							>
								{showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.newPassword && (
							<p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.newPassword}</p>
						)}
					</div>

					{/* Confirm New Password */}
					<div>
						<label htmlFor="confirmPassword" className="block mb-2 text-sm font-normal text-[#040e28] dark:text-white">
							បញ្ជាក់ពាក្យសម្ងាត់ថ្មី <span className="text-red-600">*</span>
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								id="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className={`bg-white dark:bg-white border ${
									errors.confirmPassword ? "border-red-500" : "border-gray-300 dark:border-gray-600"
								} text-gray-900 dark:text-[#001346] h-[56px] p-[16px] pr-10 rounded-lg block w-full focus:ring-primary-600 focus:border-primary-600`}
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword((prev) => !prev)}
								className="absolute bottom-[19px] right-3 text-gray-500 dark:text-[#001346] hover:text-gray-700 dark:hover:text-white"
								tabIndex={-1}
								aria-label="Toggle confirm password visibility"
							>
								{showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.confirmPassword && (
							<p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.confirmPassword}</p>
						)}
					</div>

					{/* Submit Button */}
					<div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#001346] p-4 border-t border-gray-200 dark:border-gray-700">
						<button
							type="submit"
							className="w-full text-white h-[40px] px-[16px] py-[8px] dark:bg-white dark:text-[#001346] bg-[#0f4aea] hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[32px] text-[16px] font-[600] text-center"
						>
							ផ្លាស់ប្តូរពាក្យសម្ងាត់
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}