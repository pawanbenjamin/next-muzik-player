import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <section className="flex flex-col items-center text-lg p-20">
        <h1 className="font-bold text-7xl">
          🎵 welcome to pb's
          <br />
          next muzik player
        </h1>
        <div className="flex flex-col">
          <Link className="text-3xl" href={"/signin"}>
            🤝 sign In
          </Link>
          <Link className="text-3xl" href={"/register"}>
            ✍🏽 register
          </Link>
        </div>
      </section>
    </main>
  );
}
