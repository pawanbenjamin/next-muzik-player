import prisma from "@/app/lib/prisma";

import { SongsTable } from "@/app/components/SongsTable";
import useMe from "@/app/lib/hooks/useMe";

type Props = {
  params: {
    id: string | number;
  };
};

export default async function ArtistPage({ params }: Props) {
  const user = await useMe();
  const artist = await prisma.artist.findUnique({
    where: {
      id: +params.id
    }
  });
  const songs = await prisma.song.findMany({
    where: {
      artistId: +params.id
    }
  });
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user?.id
    }
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-end pl-2 pb-8 bg-accent h-80">
        <h1 className="text-3xl font-bold">{artist?.name}</h1>
        <p className="text-xs w-1/2">
          Lorem ipsum dolor sit amet <br />
          consectetur adipisicing elit. Cumque
          <br />
        </p>
      </div>

      <SongsTable songs={songs} playlists={playlists} />
    </div>
  );
}

// Create 'use client' songs table, pass server songs into table to be able to add to playlist
