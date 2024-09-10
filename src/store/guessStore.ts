import { makeAutoObservable } from "mobx";
import type { IWord } from "../types/types";

class GuessStore {
  guessWord = "HELLO";

  attemps = 6;
  wordLength = 5;
  isEnd = false;

  words: IWord[] = Array.from({ length: this.attemps }, () => ({
    isSent: false,
    letters: Array.from({ length: this.wordLength }, () => ({
      letter: "",
      status: "",
    })),
  }));

  constructor() {
    makeAutoObservable(this);
  }

  async randomWord() {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const json = await res.json();
    this.guessWord = (json[0] as string).toUpperCase();
    // console.log((json[0] as string).toUpperCase());
  }

  writeWord(letter: string): IWord[] {
    const row = this.words.find((w) => !w.isSent);
    if (!row) return this.words;

    const cell = row.letters.find((l) => !l.letter);
    if (!cell) return this.words;

    cell.letter = letter;
    return this.words;
  }

  eraseWord() {
    const row = this.words.find((w) => !w.isSent);
    if (!row) return;

    const cell = row.letters
      .slice()
      .reverse()
      .find((l) => l.letter);
    if (!cell) return;

    cell.letter = "";
  }

  enterWord(): boolean {
    const row = this.words.find((w) => !w.isSent);
    if (!row) return false;

    if (row.letters.find((l) => !l.letter)) return false;

    const word = row.letters.map((l) => l.letter).join("");
    // конченая хуита, я заебался с этой залупой, ни хуя не работает
    // let isExist = true;
    // this.isWordExist(word)
    //   .then((exist) => {
    //     isExist = exist;
    //   })
    //   .catch(() => {});

    // if (!isExist) {
    //   console.log("Word not found");
    //   return false;
    // }

    row.isSent = true;

    row.letters.forEach((l, i) => {
      const isInWord = this.guessWord.includes(l.letter);
      if (isInWord) {
        l.status = "misplaced";
      } else {
        l.status = "incorrect";
      }

      const isCorrect = l.letter === this.guessWord[i];
      if (isCorrect) {
        l.status = "correct";
      }
    });

    if (
      word === this.guessWord ||
      this.words[this.wordLength].isSent === true
    ) {
      this.isEnd = true;
    }

    return true;
  }

  // private async isWordExist(word: string): Promise<boolean> {
  //   try {
  //     const response = await fetch(
  //       `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  //     );
  //     if (!response.ok) {
  //       console.log("Word not found");
  //       return false;
  //     }
  //     return true;
  //   } catch (error) {
  //     console.error("Error checking word existence:", error);
  //     return false;
  //   }
  // }
}

export default new GuessStore();
