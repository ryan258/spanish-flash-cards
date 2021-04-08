import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import './app.css'
import FlashCardList from './components/FlashCardList'

function App() {
  /* const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS) */
  const [flashcards, setFlashCards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  // generate all the different categories
  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php').then((res) => {
      // console.log(res.data)
      setCategories(res.data.trivia_categories)
    })
  }, [])

  // call in the questions from the API
  useEffect(() => {}, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value
        }
      })
      .then((res) => {
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
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>beep</p>
      </header> */}
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashcards={flashcards} />
      </div>
    </div>
  )
}

export default App

/*
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
*/
