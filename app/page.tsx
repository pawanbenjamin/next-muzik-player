import Link from "next/link";

export default async function Home() {
  return (
    <main className="font-mono flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center text-lg p-20">
        <h1 className="font-bold text-7xl">
          Welcome to 🎵
          <br />
          Next Muzik Player
        </h1>
        <div className="flex flex-col">
          <Link className="text-3xl" href={"/signin"}>
            🤝 Sign In
          </Link>
          <Link className="text-3xl" href={"/register"}>
            ✍🏽 Register
          </Link>
        </div>
      </section>
    </main>
  );
}
