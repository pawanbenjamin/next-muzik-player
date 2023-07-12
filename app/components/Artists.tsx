import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Artists() {
  const artists = await prisma.artist.findMany({
    include: {
      songs: true
    }
  });

  console.log(JSON.stringify(artists, null, 4));

  return (
    <div className="m-4">
      <h3 className="text-2xl">artists</h3>
      <ul className="flex flex-wrap">
        {artists.map((artist) => {
          return (
            <Link href={`/player/artist/${artist.id}`}>
              <li
                className="m-2  shadow-2xl rounded-lg p-2 w-44 
               "
              >
                <figure>
                  <img
                    className="rounded-lg "
                    src="https://i.natgeofe.com/k/75ac774d-e6c7-44fa-b787-d0e20742f797/giant-panda-eating_4x3.jpg"
                    alt=""
                  />
                  <figcaption>
                    <p className="font-bold p-1 text-white">{artist.name}</p>
                    <p className="truncate text-xs">
                      {artist.songs.map((song) => song.name).join(", ")}...
                    </p>
                  </figcaption>
                </figure>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
