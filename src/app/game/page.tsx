import { GameCanvas } from "../_components/GameCanvas";
import styles from "../page.module.css";

export default function Game() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <GameCanvas/>
      </main>
    </div>
  );
}
