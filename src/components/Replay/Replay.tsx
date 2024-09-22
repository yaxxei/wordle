import styles from "./Replay.module.scss";

interface ReplayProps {
  word: string;
  isGuessed: boolean;
  restart: () => void;
}

export function Replay({ word, isGuessed, restart }: ReplayProps) {
  return (
    <div className={styles.replay}>
      {!isGuessed && <h1>The hidden word was: {word}</h1>}
      {isGuessed && <h1>Congrats! It was {word}!</h1>}
      <button onClick={restart}>Restart</button>
    </div>
  );
}
