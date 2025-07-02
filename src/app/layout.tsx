import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./(components)/Navbar";
import { SessionContextProvider } from "./(context)/SessionContext";
import { Toaster } from "react-hot-toast";

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
  icons: {
    icon: "/favicon.svg",
  },
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
        <SessionContextProvider>
          <div className="fixed top-0 left-0 w-full z-50 bg-white">
            <Navbar />
          </div>
          <div>{children}</div>
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 1500,
              },
              error: {
                duration: 1000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "#fff",
                color: "#374151",
              },
            }}
          />
        </SessionContextProvider>
      </body>
    </html>
  );
}
