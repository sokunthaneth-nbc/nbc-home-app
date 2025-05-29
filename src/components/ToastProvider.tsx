"use client";

import { Toaster } from "react-hot-toast";

const showToastUI = process.env.NEXT_PUBLIC_SHOW_TOAST === "true";

export function ToastProvider() {
	if (!showToastUI) return null;
	return <Toaster />;
}