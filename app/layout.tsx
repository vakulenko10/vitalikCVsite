import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {LanguageProvider} from './components/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vakulenko vitalik",
  description: "my personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LanguageProvider>
      <body className={inter.className}>
        <Header/>
        

        
        {/* <div className={`absolute top-0 left-0 w-full bg-[url('https://res.cloudinary.com/dujdz2jbl/image/upload/v1710285053/welcome/bl4vrfjamutjlfx1ygyn.png')] bg-cover`}><div className="w-screen h-[200vh]"></div></div> */}
        {children}
        <Footer/>
        </body>
      </LanguageProvider>
    </html>
  );
}
