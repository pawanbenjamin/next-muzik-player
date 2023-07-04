import "./globals.css";
export const metadata = {
  title: "Next Muzik Player",
  description: "A Simplified Spotify Clone"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral">{children}</body>
    </html>
  );
}
