import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center text-lg">
        <p>Welcome 🙏🏽 to Next Muzik Player</p>
        <Link href={"/signin"}>🤝 To Sign In</Link>
        <Link href={"/register"}>✍🏽 To Register</Link>
      </section>
    </main>
  );
}
