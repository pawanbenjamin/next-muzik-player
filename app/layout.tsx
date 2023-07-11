import "./globals.css";
import { Inter, Roboto } from "next/font/google";

export const metadata = {
  title: "Next Muzik Player",
  description: "A Simplified Spotify Clone"
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-primary ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
