import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";

// Import Poppins font
const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

// Set a default sans-serif font
const sansSerifFont = {
  variable: "--font-sans-serif",
  fontFamily: "Helvetica, Arial, sans-serif", // You can define your default sans-serif font here
};

export const metadata: Metadata = {
  title: "eventGCTU",
  description: "Houses data for events of GCTU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.variable} ${sansSerifFont.variable} antialiased`}
      >
        <div className="fixed top-0 left-0 w-full z-50 bg-white">
          <Navbar />
        </div>
        <div>{children}</div>
      </body>
    </html>
  );
}
