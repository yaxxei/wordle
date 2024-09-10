import styles from "../styles/KeyboardKey.module.scss";

import type { ILetter } from "../types/types";

interface KeyboardKeyProps extends ILetter {
  onClick: () => void;
}

export function KeyboardKey({ letter, status, onClick }: KeyboardKeyProps) {
  const isMisplaced = status === "misplaced";
  const isCorrect = status === "correct";
  const isIncorrect = status === "incorrect";
  
  const isLargeKey = letter === "Enter" || letter === "Backspace"
  return (
    <button
      onClick={onClick}
      className={`${styles.key} ${
        isMisplaced ? styles.misplaced : ""} ${
        isCorrect ? styles.correct : ""} ${
        isIncorrect ? styles.incorrect : ""} ${
        isLargeKey ? styles.large : ""}`}
    >
      {letter}
    </button>
  );
}
