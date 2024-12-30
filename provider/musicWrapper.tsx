"use client"

import { useEffect, useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function MusicWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <MusicPlayer 
      audioSource="/audio/background-music.mp3"
      autoplay={true}
    />
  );
}