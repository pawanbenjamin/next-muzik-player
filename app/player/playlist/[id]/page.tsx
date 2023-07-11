import { SongsTable } from "@/app/components/SongsTable";
import prisma from "@/app/lib/prisma";

type Props = {
  params: {
    id: string | number;
  };
};

export default async function Playlist({ params }: Props) {
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: +params.id
    },
    include: {
      songs: true
    }
  });

  return (
    <div className="">
      <div>
        <h1>{playlist?.name}</h1>
      </div>
      <ul>
        <SongsTable songs={playlist?.songs} />
      </ul>
    </div>
  );
}
