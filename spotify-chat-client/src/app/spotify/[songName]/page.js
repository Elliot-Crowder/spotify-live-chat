import { notFound } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { Vibrant } from "node-vibrant/node";
export default async function songCard({ params }) {
	const songData = await getSongData(params);

	//this will be a link to a cdn in the future so it wont be necessary to create the link like this
	const localUrl = "http://localhost:3000" + songData.imgRef;
	console.log(localUrl);
	const vibrant = new Vibrant(localUrl);
	const palette = await vibrant.getPalette();
	const backgroundColor = palette.Vibrant.rgb;
	console.log(backgroundColor);
	const colorGradient = `linear-gradient(
        to bottom,
        rgba(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},1) 0%, 
        rgba(${backgroundColor[0]},${backgroundColor[1]},${backgroundColor[2]},0) 80%)`;
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
			</div>
		</div>
	);
}

const fs = require("fs");
export async function getSongData(params) {
	//this will be changed to a fetch to an api once the back end is implemented
	params = await params;
	//check if the request for the song data actually returned a valid song
	if (
		!fs.existsSync(
			`C:\\code\\spotify-chat\\spotify-chat-client\\public\\data\\mockdata\\${params.songName}.json`
		)
	) {
		notFound();
	}

	const songData = JSON.parse(
		fs.readFileSync(
			`C:\\code\\spotify-chat\\spotify-chat-client\\public\\data\\mockdata\\${params.songName}.json`,
			"utf-8"
		)
	);

	return songData;
}
