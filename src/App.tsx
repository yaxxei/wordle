import { useEffect } from "react";
import "./App.scss";
import { GuessField } from "./components/GuessFiled";
import { Header } from "./components/Header";
import { Keyboard } from "./components/Keyboard";
import { useStore } from "./store/rootStore";
import { Replay } from "./components/Replay/Replay";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { guessStore } = useStore();

  useEffect(() => {
    guessStore.randomWord();
  }, []);

  function restartHandler() {
    guessStore.restart();
  }

  return (
    <>
      {guessStore.isEnd && (
        <Replay
          word={guessStore.hiddenWord}
          isGuessed={guessStore.isGuessed}
          restart={restartHandler}
        />
      )}
      <div id="container" className={guessStore.isEnd ? "dimmed" : ""}>
        <Header />
        <GuessField />
        <Keyboard />
      </div>
    </>
  );
});

export default App;
