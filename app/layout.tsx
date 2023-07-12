import "./globals.css";
import {
  Roboto_Condensed,
  Inter,
  Ubuntu_Mono,
  Roboto_Slab,
  Montserrat,
  Source_Sans_3
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

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-montserrat"
});

const source_s_3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-source_s_3"
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-primary ${montserrat.variable} ${source_s_3.variable} font-montserrat text-neutral`}
      >
        {children}
      </body>
    </html>
  );
}
