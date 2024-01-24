import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header.jsx";
import Provider from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Situn Printrest",
  description: "Store your favourite photo and share your profile",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
