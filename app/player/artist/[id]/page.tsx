import prisma from "@/app/lib/prisma";

import { SongsTable } from "@/app/components/SongsTable";

type Props = {
  params: {
    id: string | number;
  };
};

export default async function ArtistPage({ params }: Props) {
  const songs = await prisma.song.findMany({
    where: {
      artistId: +params.id
    }
  });

  return (
    <div>
      <SongsTable songs={songs} />
    </div>
  );
}

// Create 'use client' songs table, pass server songs into table to be able to add to playlist
