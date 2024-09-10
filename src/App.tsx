import { useEffect } from 'react';
import './App.scss'
import { GuessField } from './components/GuessFiled'
import { Header } from './components/Header'
import { Keyboard } from './components/Keyboard'
import { useStore } from './store/rootStore';

export default function App() {
  const { guessStore } = useStore();

  useEffect(() => {
    guessStore.randomWord();
  }, []);

  return (
    <div className="container">
      <Header />
      <GuessField />
      <Keyboard />
    </div>
  )
}
