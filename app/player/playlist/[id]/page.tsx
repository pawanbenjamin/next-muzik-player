import { SongsTable } from "@/app/components/SongsTable";
import useMe from "@/app/lib/hooks/useMe";
import prisma from "@/app/lib/prisma";

type Props = {
  params: {
    id: string | number;
  };
};

export default async function Playlist({ params }: Props) {
  const user = useMe();
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: +params.id
    },
    include: {
      songs: true
    }
  });

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user?.id
    }
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-end pl-2 pb-8 h-80">
        <h1>Playlist {playlist?.id}</h1>
      </div>
      <ul>
        <SongsTable songs={playlist?.songs} playlists={playlists} />
      </ul>
    </div>
  );
}
