import { useState } from "react";

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

  const totalQuiz = quizItems.length;

  const handleClick = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prevState) => prevState + 1);
    }

    if (currentQuiz + 1 < totalQuiz) {
      setCurrentQuiz((prevState) => prevState + 1);
      console.log("hello");
    } else {
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuiz(0);
    setScore(0);
    setShowScore(false);
  };

  return (
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
  );
}

export default App;
