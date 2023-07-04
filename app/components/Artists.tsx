import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Artists() {
  const artists = await prisma.artist.findMany({});

  return (
    <div className="m-4">
      <h3 className="text-2xl">artists</h3>
      <ul className="flex ">
        {artists.map((artist) => {
          return (
            <Link href={`/player/artist/${artist.id}`}>
              <li className="m-4">{artist.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
