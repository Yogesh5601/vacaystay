import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vacaystay",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       className={`w-full flex flex-col justify-center items-center text-black bg-white 3xl:px-[5%] 4xl:px-[20%] ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
       <div className="min-h-screen py-6 w-full flex justify-center"> {children}</div>
        <Footer/>
      </body>
    </html>
  );
}
