import prisma from "../lib/prisma";
import Link from "next/link";

export default async function Artists() {
  const artists = await prisma.artist.findMany({});

  return (
    <div className="m-4">
      <h3 className="text-2xl">artists</h3>
      <ul className="flex flex-wrap">
        {artists.map((artist) => {
          return (
            <Link href={`/player/artist/${artist.id}`}>
              <li className="m-2 bg-base-100 shadow-xl rounded-lg p-2 w-44">
                <figure>
                  <img
                    className="rounded-lg pb-1"
                    src="https://i.natgeofe.com/k/75ac774d-e6c7-44fa-b787-d0e20742f797/giant-panda-eating_4x3.jpg"
                    alt=""
                  />
                </figure>
                <div className="">
                  <p className="font-bold p-1">{artist.name}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
