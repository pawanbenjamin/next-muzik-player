import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Artists() {
  const artists = await prisma.artist.findMany({});

  return (
    <div className="m-4">
      <h3 className="text-2xl">artists</h3>
      <ul className="flex overflow-auto">
        {artists.map((artist) => {
          return (
            <Link href={`/player/artist/${artist.id}`}>
              <li className="m-4 card w-48 bg-base-100 shadow-xl">
                <div className="card-body">
                  <p className="card-title">{artist.name}</p>
                </div>
                <figure>
                  <img src="https://placehold.co/600x400" alt="" />
                </figure>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
