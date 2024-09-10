import styles from "../styles/GuessField.module.scss"
import { useCallback, useEffect } from "react";
import { GuessFieldCell } from "./GuessFieldCell";
import { useStore } from "../store/rootStore";
import { observer } from "mobx-react-lite";

export const GuessField = observer(() => {
  const { guessStore } = useStore();
  
  const keyUpEvent = useCallback((event: KeyboardEvent) => {
    const isLetter = /^[a-zA-Z]$/.test(event.key);
    const isBackspace = event.key === "Backspace";
    const isEnter = event.key === "Enter";

    if (isLetter) {
      guessStore.writeWord(event.key.toUpperCase());
    }
    if (isBackspace) {
      guessStore.eraseWord();
    }
    if (isEnter) {
      guessStore.enterWord();
    }
  }, [guessStore.writeWord]);

  useEffect(() => {
    if (guessStore.isEnd) {
      window.removeEventListener("keyup", keyUpEvent);
      return;
    }
    
    window.addEventListener("keyup", keyUpEvent);

    return () => {
      window.removeEventListener("keyup", keyUpEvent);
    };
  }, [keyUpEvent, guessStore.isEnd]);

  return (
    <section className={styles.field}>
      {guessStore.isEnd && <h1>Reload the page to restart</h1>}
      <table>
        <tbody>
          {guessStore.words.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.letters.map((cell, cellIndex) => (
                <th key={cellIndex}>
                  <GuessFieldCell letter={cell.letter} status={cell.status} />
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
})
