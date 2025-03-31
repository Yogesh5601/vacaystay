import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner"
import SessionProviderWrapper from "@/components/SessionProviderWrapper";


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
        <Header />
        <SessionProviderWrapper>
          <div className="min-h-screen w-full"> {children}</div>
        </SessionProviderWrapper>


        <Footer />
        <Toaster />
      </body>
    </html>
  );
}



// import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Fallback font
// // import { GeistSans, GeistMono } from "geist/font";
// import "./globals.css";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import { Toaster } from "@/components/ui/sonner";

// // Fallback font from Google Fonts
// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });

// export const metadata: Metadata = {
//   title: {
//     default: "Vacaystay",
//     template: "%s | Vacaystay",
//   },
//   description: "Find your perfect vacation stay with Vacaystay",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={`${inter.variable}`}>
//       <body className="min-h-screen w-full flex flex-col justify-center bg-white text-black antialiased font-sans">
//         <div className="flex min-h-screen flex-col">
//           <Header />
//           <main className="flex-1">
//             <section className="mx-auto px-4 py-12 sm:px-6 ">
//               {children}
//             </section>
//           </main>
//           <Footer />
//         </div>
//         <Toaster position="top-center" richColors />
//       </body>
//     </html>
//   );
// }