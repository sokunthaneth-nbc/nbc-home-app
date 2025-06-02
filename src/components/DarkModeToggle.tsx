'use client';

import { useLayoutEffect, useState } from 'react';

export default function DarkModeToggle() {
	const [isDark, setIsDark] = useState(false);
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		const saved = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const dark = saved === 'dark' || (!saved && prefersDark);

		setTheme(dark);
		setIsDark(dark);
		setMounted(true);
	}, []);

	const setTheme = (dark: boolean) => {
		const root = document.documentElement;
		root.classList.remove(dark ? 'light' : 'dark');
		root.classList.add(dark ? 'dark' : 'light');
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	};

	const toggleDarkMode = () => {
		const newTheme = !isDark;
		setTheme(newTheme);
		setIsDark(newTheme);
	};

	if (!mounted) return null;

	return (
		<label className="inline-flex items-center cursor-pointer relative">
			<input
				type="checkbox"
				checked={isDark}
				onChange={toggleDarkMode}
				className="sr-only peer"
			/>
			<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-400 peer-checked:bg-blue-600"></div>
		</label>
	);
}