"use client";
import { useState, createContext } from "react";

//create playBack context
export const PlaybackContext = createContext();

//this function is soley used for managing the state of the spotify web player and pass it to components that depend on it for rendering
export default function PlaybackProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const onTogglePause = () => {
    setIsPlaying((prev) => !prev);
    console.log("pause button clicked");
  };
  return (
    <PlaybackContext.Provider value={{ isPlaying, onTogglePause }}>
      {children}
    </PlaybackContext.Provider>
  );
}
