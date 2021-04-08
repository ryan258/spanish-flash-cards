import React, { useState } from 'react'
import FlashCardList from './components/FlashCardList'

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS)

  return (
    <div className="App">
      <header className="App-header">
        <p>beep</p>
      </header>
      <FlashCardList flashcards={flashcards} />
    </div>
  )
}

export default App

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'How do you say HELLO in Spanish?',
    answer: 'HOLA',
    options: ['Beep', 'Boop', 'HOLA', 'Marklar']
  },
  {
    id: 2,
    question: 'How do you say CIAO in Spanish?',
    answer: 'CIAO',
    options: ['Beep', 'Boop', 'CIAO', 'Marklar']
  },
  {
    id: 3,
    question: 'How do you say PIZZA in Spanish?',
    answer: 'PIZZA',
    options: ['Beep', 'Boop', 'PIZZA', 'Marklar']
  },
  {
    id: 4,
    question: 'How do you say CERVEZA in Spanish?',
    answer: 'CERVEZA',
    options: ['Beep', 'Boop', 'CERVEZA', 'Marklar']
  }
]
