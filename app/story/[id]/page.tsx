"use client"

import { RetroGrid } from "@/components/RetroGrid";
import { StoryPage } from "@/components/StoryPage";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-black md:shadow-xl">
      <StoryPage storyId={resolvedParams.id} />
 
      <RetroGrid />
    </div>
  )
}