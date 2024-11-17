import React, { useState } from 'react'
import questions from '../Data';

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [score, setScore] = useState(0);

    // create hanlde click answer function 
    const handleAnswerClick = (answer) => {
        if (isQuizFinished) return;

        setSelectedAnswer(answer);
        const correctAnswer = questions[currentQuestion].correctAnswer;

        if (answer === correctAnswer) {
            setFeedback("Correct!")
            setScore(score + 1);
        } else {
            setFeedback(`Incorrect! The correct answer is ${correctAnswer}`)
        }
    }

    // Next button function
    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setFeedback('');
        } else {
            setIsQuizFinished(true);
        }
    }

    // Restart  Quiz 
    const restartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setFeedback("");
        setScore(0);
        setIsQuizFinished(false);
    }

    if(isQuizFinished) {
        return (
            <div className="quiz-container">
                <h2>Quiz Finished!</h2>
                <p>Your score: {score} / {questions.length}</p>
                <button className='restart-button' onClick={restartQuiz}> Restart Quiz</button>
            </div>
        )
    }

    return (
        <>
            <div className="quiz-container">
                <h2>{questions[currentQuestion].question}</h2>
                <div>
                    {
                        questions[currentQuestion].answers.map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(answer)}
                                disabled={selectedAnswer !== null}
                                className={selectedAnswer ? answer === questions[currentQuestion].correctAnswer ? "correct" : "incorrect" : ""}
                            >{answer}</button>
                        ))
                    }
                </div>
                <p className='feedback'>{feedback}</p>
                {
                    selectedAnswer && currentQuestion < questions.length - 1 && (
                        <button className='next-button' onClick={nextQuestion}>Next</button>
                    )
                }

                {
                    selectedAnswer && currentQuestion === questions.length - 1 && (
                        <button className='next-button' onClick={nextQuestion}>Finish Quiz</button>
                    )
                }
            </div>
        </>
    )
}

export default Quiz;
