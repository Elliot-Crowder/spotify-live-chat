import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { Vibrant } from "node-vibrant/node";
import PlayButton from "@/app/Components/PlayButton";
import path from "path";

export default async function SongCard({ params }) {
  const songData = await getSongData(params);
  let colorGradient;
  //this will be a link to a cdn in the future so it wont be necessary to create the link like this. Will need to buffer image and then read pixel data from the buffer.
  try {
    const localUrl = "http://localhost:3000" + songData.imgRef;
    // console.log(localUrl);
    const vibrant = new Vibrant(localUrl);
    const palette = await vibrant.getPalette();
    const backgroundColor = palette.Vibrant.rgb;
    const backgroundColor2 = palette.DarkVibrant.rgb;
    // console.log(backgroundColor);
    colorGradient = `linear-gradient(
        to bottom,
        rgba(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},1) 0%, 
		rgba(${backgroundColor2[0]},${backgroundColor2[1]},${backgroundColor2[2]},1) 60%,
        rgba(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},0) 100%)`;
  } catch (err) {
    console.log(err);
    //sets the default background to dark grey in the event that pixel data cannot be read from the image.
    colorGradient = "rgb(37, 37, 37)";
  }
  return (
    <div className={styles.songCard}>
      <div
        className={styles.gradientOverlay}
        style={{
          background: colorGradient,
        }}
      >
        <Image
          src={songData.imgRef || null}
          alt={`${songData.songName} by ${songData.artist} cover-image"`}
          width={200}
          height={200}
          className={styles.songImage}
        ></Image>
        <div className={styles.songInfo}>
          <h1>{songData.songName}</h1>
          <p style={{ fontSize: "12px" }}>{songData.artist}</p>
        </div>
        <div className={styles.barWrapper}>
          <ProgressBar />
        </div>
        <div className={styles.songNavigation}>
          {/* <button>Backward</button> */}
          <PlayButton></PlayButton>
          {/* <button>Forward</button> */}
        </div>
      </div>
    </div>
  );
}

const fs = require("fs");
export async function getSongData(params) {
  //this will be changed to a fetch to an api once the back end is implemented
  params = await params;
  //check if the request for the song data actually returned a valid song
  const filePath = path.join(
    process.cwd(),
    `src\\data\\mockdata\\${params.songName}.json`
  );
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const songData = JSON.parse(fs.readFileSync(filePath));

  return songData;
}
