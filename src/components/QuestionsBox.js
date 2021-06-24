import React, { useEffect, useState } from 'react';
import QuestionsResults from './QuestionsResults';
import QuestionsSlider from './QuestionsSlider';
import './style.scss';

const QuestionsBox = ({ questions, setStart }) => {

  const [activeQ, setActiveQ] = useState(0);
  const [finallBtn, setFinallBtn] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    console.log('answers.length === ', answers);
    if (questions && answers.length === questions.length) setFinallBtn(true)
  }, [answers])

  const prevQ = () => {
    if (activeQ !== 0) {
      setActiveQ( activeQ - 1 )
    } else return
  }

  const nextQ = () => {
    if (activeQ < questions.length - 1) {
      setActiveQ( activeQ + 1 )
    } else return
  }
    
  return (
    <section className='questions'>
      { !showResult ? 
        <QuestionsSlider questions={questions} activeQ={activeQ} answers={answers} setAnswers={setAnswers} />
        :
        <QuestionsResults answers={answers} setAnswers={setAnswers} showResult={showResult} setShowResult={setShowResult} />
      }
        
      <div className='questions__nav'>
      { !showResult ? 
        <>
          <button 
          onClick={() => prevQ()}
          disabled={activeQ === 0 ? true : false}
          >
            prev quetion
          </button>

          <button 
            onClick={() => nextQ()}
            disabled={activeQ === questions.length - 1 ? true : false}
          >
            next question
          </button>

          <button 
            onClick={() => setShowResult(true)} 
            disabled={!finallBtn ? true : false}
          >
            finish him
          </button>
        </>
        :
          <button 
            onClick={() => setStart(false)} 
            style={{ opacity: finallBtn ? 1 : 0, zIndex: finallBtn ? '0' : '-5'}}
          >
            try again!
          </button>
      }
      </div>
    </section>
  );
}
  
export default QuestionsBox;