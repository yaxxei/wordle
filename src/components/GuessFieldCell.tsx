import styles from "../styles/GuessFieldCell.module.scss"
import type { ILetter } from "../types/types"

export function GuessFieldCell({letter, status}: ILetter) {
  const isMisplaced = status === "misplaced";
  const isCorrect = status === "correct";
  const isIncorrect = status === "incorrect";
  return (
    <h1 className={`${styles.cell} ${isMisplaced ? styles.misplaced : ""} ${isCorrect ? styles.correct : ""} ${isIncorrect ? styles.incorrect : ""}`}>{letter}</h1>
  )
}