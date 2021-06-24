import { useEffect, useState } from 'react';
import './App.scss';
import QuestionsBox from './components/QuestionsBox';

const App = () => {

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState();

  const url = 'https://opentdb.com/api.php?amount=10';

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(result => setQuestions(result.results))
  }, [start])
  
  return (
    <div className="container">
      { start && questions ? 
        <QuestionsBox questions={questions} setStart={setStart} />
        : <button onClick={() => setStart(true)}>cick here to start testing</button>
      }
    </div>
  );
}

export default App;
