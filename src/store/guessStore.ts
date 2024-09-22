import { makeAutoObservable } from "mobx";
import type { IWord } from "../types/types";

class GuessStore {
  hiddenWord = "HELLO";

  attemps = 6;
  wordLength = 5;
  isEnd = false;
  isGuessed = false;

  words: IWord[] = Array.from({ length: this.attemps }, () => ({
    isSent: false,
    letters: Array.from({ length: this.wordLength }, () => ({
      letter: "",
      status: "",
    })),
  }));

  streak = 0;

  constructor() {
    makeAutoObservable(this);
  }

  async randomWord(): Promise<string> {
    const res = await fetch(
      "https://random-word-api.herokuapp.com/word?length=5"
    );
    const json = await res.json();
    this.hiddenWord = (json[0] as string).toUpperCase();
    console.log(this.hiddenWord);
    return this.hiddenWord;
  }

  async restart() {
    this.words = this.words.map(
      (row): IWord => ({
        ...row,
        letters: row.letters.map((l) => ({ ...l, letter: "", status: "" })),
        isSent: false,
      })
    );

    this.randomWord();

    this.isEnd = false;
    this.isGuessed = false;
  }

  writeWord(letter: string) {
    const row = this.words.find((w) => !w.isSent);
    if (!row) return this.words;

    const cell = row.letters.find((l) => !l.letter);
    if (!cell) return this.words;

    cell.letter = letter;
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

  enterWord() {
    const row = this.words.find((w) => !w.isSent);
    if (!row) return;

    if (row.letters.find((l) => !l.letter)) return;

    const word = row.letters.map((l) => l.letter).join("");

    row.isSent = true;
    row.letters.forEach((l, i) => {
      const isInWord = this.hiddenWord.includes(l.letter);
      if (isInWord) {
        l.status = "misplaced";
      } else {
        l.status = "incorrect";
      }

      const isCorrect = l.letter === this.hiddenWord[i];
      if (isCorrect) {
        l.status = "correct";
      }
    });

    if (word === this.hiddenWord) {
      this.isEnd = true;
      this.isGuessed = true;
      this.streak++;
      return;
    }
    if (this.words[this.wordLength].isSent === true) {
      this.isEnd = true;
      this.isGuessed = false;
      this.streak = 0;
      return;
    }
  }
}

export default new GuessStore();
