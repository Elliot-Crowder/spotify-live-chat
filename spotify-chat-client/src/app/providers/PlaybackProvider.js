"use client";
import { useState } from "react";
export default function PlaybackProvider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const onToggle = () => {
    setIsPlaying((prev) => !prev);
  };
}
