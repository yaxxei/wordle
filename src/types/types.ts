type LetterStatus = "correct" | "incorrect" | "misplaced" | "";

export interface ILetter {
  letter: string;
  status: LetterStatus;
}

export interface IWord {
  isSent: boolean;
  letters: ILetter[];
}
