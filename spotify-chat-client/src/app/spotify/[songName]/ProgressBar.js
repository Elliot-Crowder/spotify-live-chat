import styles from "./progressbar.module.css";

export default function ProgressBar() {
	return (
		<>
			<div className={styles.progressBackground}>
				<div className={styles.songProgress}>
					<div className={styles.progressBall}></div>
				</div>
			</div>
		</>
	);
}
