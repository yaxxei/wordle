import { useStore } from "../store/rootStore";
import styles from "../styles/Keyboard.module.scss";

import type { ILetter } from "../types/types";
import { KeyboardKey } from "./KeyboradKey";

export function Keyboard() {
  const { guessStore } = useStore();
  
  const keys: Record<string, ILetter>[] = [
    {Q: { letter: "Q", status: "" },
    W: { letter: "W", status: "" },
    E: { letter: "E", status: "" },
    R: { letter: "R", status: "" },
    T: { letter: "T", status: "" },
    Y: { letter: "Y", status: "" },
    U: { letter: "U", status: "" },
    I: { letter: "I", status: "" },
    O: { letter: "O", status: "" },
    P: { letter: "P", status: "" },},
    {A: { letter: "A", status: "" },
    S: { letter: "S", status: "" },
    D: { letter: "D", status: "" },
    F: { letter: "F", status: "" },
    G: { letter: "G", status: "" },
    H: { letter: "H", status: "" },
    J: { letter: "J", status: "" },
    K: { letter: "K", status: "" },
    L: { letter: "L", status: "" },},
    {Enter: { letter: "Enter", status: "" },
    Z: { letter: "Z", status: "" },
    X: { letter: "X", status: "" },
    C: { letter: "C", status: "" },
    V: { letter: "V", status: "" },
    B: { letter: "B", status: "" },
    N: { letter: "N", status: "" },
    M: { letter: "M", status: "" },
    Backspace: { letter: "Backspace", status: "" },}
  ];

  function handleClick(letter: string) {
    if (letter === "Enter") {
      guessStore.enterWord();
      return;
    }
    if (letter === "Backspace") {
      guessStore.eraseWord();
      return;
    }
    guessStore.writeWord(letter);
  }

  return (
    <div className={styles.keyboard}>
      {keys.map((k, i) => (
        <div key={i}>
          {Object.values(k).map((l, i) => (
            <KeyboardKey key={i} 
              letter={l.letter} 
              status={l.status}
              onClick={() => handleClick(l.letter)} />
          ))}
        </div>
      ))}
    </div>
  )
}