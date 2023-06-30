import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Artists() {
  const artists = await prisma.artist.findMany({});

  return (
    <div>
      <h3>Artists to check out:</h3>
      {artists.map((artist) => {
        return (
          <Link href={`/player/artist/${artist.id}`}>
            <p>{artist.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
