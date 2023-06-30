import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <p>Landing Page</p>
      <Link href={"/signin"}>To Sign In</Link>
      <Link href={"/register"}>To Register</Link>
    </main>
  );
}
