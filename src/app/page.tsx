import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.startScreen}>
          <h1 className={styles.mainTitle}>Square Platformer 0.1.3</h1>
          <p className={styles.instructions}>
            navigate the main player to the yellow checkpoints.
          </p>
          <p className={styles.instructions}>
            use keyboard arrows to move the player around.
          </p>
          <p className={styles.instructions}>you can use the spacebar to jump.</p>

          <div className={styles.btnContainer}>
            <Link href='/game'>
              <button className={styles.btn} id="start-btn">
                Start Game
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
