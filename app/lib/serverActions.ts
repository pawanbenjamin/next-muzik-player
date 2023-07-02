"use server";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

export async function addToPlaylist(playlistId: number, songId: number) {
  await prisma.playlist.update({
    where: {
      id: playlistId
    },
    data: {
      songs: {
        connect: [{ id: songId }]
      }
    }
  });

  revalidatePath("/player");
}
