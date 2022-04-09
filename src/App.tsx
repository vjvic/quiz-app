import { useState, useEffect } from "react";

interface Quiz {
  id: number;
  question: string;
  answers: {
    id: number;
    answerText: string;
    isCorrect: boolean;
  }[];
}

function App() {
  const quizItems: Quiz[] = [
    {
      id: 1,
      question: "What is the meaning of OS?",
      answers: [
        {
          id: 1,
          answerText: "Operating System",
          isCorrect: true,
        },
        {
          id: 2,
          answerText: "Operating Siomai",
          isCorrect: false,
        },
        {
          id: 3,
          answerText: "On System",
          isCorrect: false,
        },
        {
          id: 4,
          answerText: "Operate System",
          isCorrect: false,
        },
      ],
    },
    {
      id: 2,
      question: "What is the heart of a computer?",
      answers: [
        {
          id: 1,
          answerText: "Power supply",
          isCorrect: true,
        },
        {
          id: 2,
          answerText: "Ram",
          isCorrect: false,
        },
        {
          id: 3,
          answerText: "Google",
          isCorrect: false,
        },
        {
          id: 4,
          answerText: "GPU",
          isCorrect: false,
        },
      ],
    },
    {
      id: 3,
      question: "What is the brain of a computer?",
      answers: [
        {
          id: 1,
          answerText: "Power supply",
          isCorrect: false,
        },
        {
          id: 2,
          answerText: "Ram",
          isCorrect: false,
        },
        {
          id: 3,
          answerText: "CPU",
          isCorrect: true,
        },
        {
          id: 4,
          answerText: "GPU",
          isCorrect: false,
        },
      ],
    },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(5);

  function updateTime() {
    if (seconds === 0) {
      setMinutes((minutes) => minutes - 1);
      setSeconds(59);
    } else {
      setSeconds((seconds) => seconds - 1);
    }
  }

  /*eslint-disable */
  useEffect(() => {
    const token = setTimeout(updateTime, 1000);

    if (seconds === 0 && minutes === 0) clearTimeout(token);

    if (minutes === 0 && seconds === 0) {
      setShowScore(true);
    }

    return function cleanUp() {
      clearTimeout(token);
    };
  });

  const totalQuiz = quizItems.length;

  const handleClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevState) => prevState + 1);
    }

    if (currentQuiz + 1 < totalQuiz) {
      setCurrentQuiz((prevState) => prevState + 1);
    } else {
      setShowScore(true);
      setMinutes(0);
      setSeconds(0);
    }
  };

  const handleRetry = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowScore(false);
    setMinutes(5);
    setSeconds(59);
  };

  return (
    <>
      <div>
        {minutes}:{seconds}
      </div>
      <section className="quiz-container">
        {showScore ? (
          <div className="result">
            <div>
              <p>
                Score: {score}/{totalQuiz}
              </p>
              <button onClick={handleRetry}>Retry</button>
            </div>
          </div>
        ) : (
          <>
            <span className="quiz-number">
              {currentQuiz + 1} of {totalQuiz}
            </span>
            <div className="quiz-question">
              <span className="question-heading">Question:</span>
              <p className="question-text">{quizItems[currentQuiz].question}</p>
            </div>

            <div className="answers">
              {quizItems[currentQuiz].answers.map((answer) => (
                <button
                  onClick={() => handleClick(answer.isCorrect)}
                  key={answer.id}
                >
                  {answer.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default App;
