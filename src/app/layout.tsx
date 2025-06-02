// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import RegisterServiceWorker from "@/components/RegisterServiceWorker";
import { ThemeProvider } from 'next-themes';

const kantumruyPro = localFont({
	src: "../../public/fonts/KantumruyPro-Regular.ttf",
	variable: "--font-kantumruy",
	display: "swap",
});

export const metadata: Metadata = {
	title: "NBC Home App",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className={`${kantumruyPro.variable} antialiased`} >
				<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
					<RegisterServiceWorker />
						{children}
					<ToastProvider />
				</ThemeProvider>
			</body>
		</html>
	);
}