import React from 'react';
import './style.scss';

const QuestionsSlider = ({ questions, activeQ, answers, setAnswers }) => {

  const ckeckIt = (item, el) => {
    // костыль из-за кривых данных
    const newCorrect = item.correct_answer.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "&");
    const newEl = el.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "&");
    const newQ = item.question.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "&");
      
    const newItem = {
        correctA: newCorrect,
        currentA: newEl,
        question: newQ,
        difficulty: item.difficulty
    }
    const newArray = answers.filter(element => element.question !== item.question)
    setAnswers(newArray);
    setAnswers((oldItems) => [...oldItems, newItem])
  }
  

  const questionToRender = () => {
    const arrQuestions = []
    if (questions) {

      questions.forEach((item, i) => {

        let arrVariants = item.incorrect_answers;
        arrVariants.push(item.correct_answer);
        const uniqVariants = [...new Set(arrVariants)];

        const variantsToRender = uniqVariants.map((el, index) => {

          const labelString = el.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "&")
          //   if (item.type !== 'multiple') {
          if (typeof item.correct_answer === 'string') {
            console.log('index === ', index);
            return (
                <div key={`${i}.${index}`}>
                  <input 
                    type='radio' 
                    id={`${i}.${index}`} 
                    name={item.question.replace(/ /g,"_")} value={el} 
                    onChange={() => ckeckIt(item, el)}
                  />
                  <label htmlFor={`${i}.${index}`}> {labelString} </label>
                </div>
            )
          } else {
            return (
                <div key={`${i}.${index}`}>
                  <input 
                    type='checkbox' 
                    id={`${i}.${index}`} 
                    name={item.question.replace(/ /g,"_")}
                    onChange={(e) => ckeckIt(item, el)} //, e.target)}
                  />
                  <label htmlFor={`${i}.${index}`}> {labelString} </label>
                </div>
            )
          }
        })

        const questionString = item.question.replace(/&quot;/g, "'").replace(/&#039;/g, "'").replace(/&amp;/g, "&")
          
        arrQuestions.push(
          <div 
            key={i}
            className='questions__slider__item'
            style={{ 
              display: activeQ === i ? 'flex' : 'none'
            }}
          >
            <h2>№{i+1}. {questionString}</h2>
            <div className='questions__slider__item__answers'>
              {variantsToRender}
            </div>
            <p>difficulty level: <br /> {item.difficulty}</p>

          </div>
        )
      });
    }

    return arrQuestions
  }
    
  return (
    <div className='questions__slider'>
        {questionToRender()}
    </div>
  );
}
  
export default QuestionsSlider;