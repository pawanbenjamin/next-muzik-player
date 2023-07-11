import "./globals.css";
import {
  Roboto_Condensed,
  Inter,
  Ubuntu_Mono,
  Roboto_Slab
} from "next/font/google";

export const metadata = {
  title: "Next Muzik Player",
  description: "A Simplified Spotify Clone"
};

const roboto_c = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto_c"
});

const roboto_s = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto_s"
});

const ubuntu_m = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-ubuntu_m"
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inter"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-primary ${inter.variable} ${roboto_c.variable} ${ubuntu_m.variable} ${roboto_s.variable} font-robotos text-normal`}
      >
        {children}
      </body>
    </html>
  );
}
