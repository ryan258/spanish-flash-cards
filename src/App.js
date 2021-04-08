import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './app.css'
import FlashCardList from './components/FlashCardList'

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS)

  // call in the questions from the API
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10').then((res) => {
      setFlashCards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map((incorrectAnswer) => decodeString(incorrectAnswer)),
            // questionItem.correct_answer
            answer
          ]
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5)
          }
        })
      )
      console.log(res.data)
    })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>beep</p>
      </header>
      <div className="container">
        <FlashCardList flashcards={flashcards} />
      </div>
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
  }
]
