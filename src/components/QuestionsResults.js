import React, { useEffect, useState } from 'react';
import './style.scss';

const QuestionsResults = ({ answers, setAnswers, showResult }) => {

  const [results, setResults] = useState([]);
  const [DESC, setDESC] = useState(false)

  useEffect(() => {
    if (showResult === true) {
        setResults([]);
        answers.forEach((item) => {
            const color = item.currentA === item.correctA ? 'rgb(104 245 46)' : 'rgb(245 46 110)'
            const newItem = (
                <tr className='questions__results__item'>
                <td>{item.difficulty}</td>
                <td>{item.question}</td>
                <td style={{ color: color }}>{item.currentA}</td>
                <td style={{ color: color }}>{item.correctA}</td>
                </tr>
            )
            setResults((oldItems) => [...oldItems, newItem])
        })
    }
  }, [answers])

  const sortData = (key) => {
      setAnswers([ ...answers].sort((a, b) => {
        if (a[key] > b[key]) {
            return DESC ? 1 : -1
          }
          if (a[key] < b[key]) {
            return DESC ? -1 : 1
          }
          return 0
      }))
      setDESC(!DESC)
  }
    
  return (
        <table className='questions__results'>
          <thead>
            <tr className='questions__results__item'>
              <th>
                difficulty
                <span
                    onClick={() => {sortData('difficulty')}}
                    style={{ transform: DESC ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="#b8c4fb" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.515015 1.46501L9.00001 9.95001L17.485 1.46501L16.071 0.0500126L9.00001 7.12201L1.92901 0.0500126L0.515015 1.46501Z"/>
                    </svg>
                  </span>
              </th>
              <th>question</th>
              <th>ur answer</th>
              <th>correct answer</th>
            </tr>
          </thead>
          <tbody>
            {results}
          </tbody>
        </table>
  );
}
  
export default QuestionsResults;