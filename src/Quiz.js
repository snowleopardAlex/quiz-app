import React from "react";
import {QuizData} from "./QuizData";
import './App.css';
import { Card, Button } from "react-bootstrap";

class Quiz extends React.Component {
    state = {
        currentQuestion: 0,
        myAnswer: null,
        options: [],
        score: 0,
        disbled: true,
        isEnd: false
    };

    loadQuizData = () => {
        this.setState(() => {
            return {
                questions: QuizData[this.state.currentQuestion].question,
                options: QuizData[this.state.currentQuestion].options,
                answer: QuizData[this.state.currentQuestion].answer
            }
        });
    }

    componentDidMount() {
        this.loadQuizData();
    }

    // next question
    handleNextQuestion = () => { 
        const {myAnswer, answer, score} = this.state;
        // increment the score if answer is correct
        if(myAnswer === answer) {
            this.setState({
                score: score + 1
            })
        }
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
        console.log(this.state.currentQuestion);
    }

    // update the component
    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentQuestion !== prevState.currentQuestion) {
            this.setState(() => {
                return {
                    disabled: true,
                    questions: QuizData[this.state.currentQuestion].question,
                    options: QuizData[this.state.currentQuestion].options,
                    answer: QuizData[this.state.currentQuestion].answer
                };
            });
        }
    }

    // check the answer
    checkAnswer = answer => {
        this.setState({
            myAnswer: answer,
            disabled: false
        });
    }

    // finish the quiz
    handleFinish = () => {
        if(this.state.currentQuestion === QuizData.length - 1) {
            this.setState({
                isEnd: true
            });
        }
        if (this.state.myAnswer === this.state.answer) {
            this.setState({
                score: this.state.score + 1
            });
        }
    }

    render() {
        const { options, currentQuestion, myAnswer, isEnd} = this.state;
          
          if(isEnd) {
              return (
                  <div>
                      <h2 className="ml-5 mt-5">Final score is {this.state.score}</h2>
                      <p className="ml-3">The Correct Answers for the Questions was: </p>
                      <ul style={{listStyleType: "none"}}>
                          {QuizData.map((item, index) => (
                              <li key={index}>{item.answer}</li>
                          ))}
                      </ul>
                  </div>
              );
          } else {
        return (
         <div>
            <h4 className="mt-5 mb-5">{this.state.questions}</h4> 
            <span>{`Questions ${currentQuestion} out of ${QuizData.length - 1}`}</span>
            {options.map(option => (
                <Card 
                  className={`mx-auto d-block shadow p-3 mb-5 bg-white rounded mt-4
                  ${myAnswer === option ? "selected" : null}`}
                  style={{maxWidth: "50%"}} 
                  key={option.id}
                  onClick={() => this.checkAnswer(option)}
                  >
                <Card.Body style={{backgroundColor: "#FF0099", color: "white"}}>
                  {option}
                </Card.Body>      
                </Card>
            ))}
            {currentQuestion < QuizData.length - 1 &&
            <Button 
              className="mt-4" 
              variant="info"
              disabled={this.state.disabled}
              onClick={this.handleNextQuestion}>Next question</Button>
              }
              {/* // finish button */}
              {currentQuestion === QuizData.length - 1 && (
              <Button
                className="mt-4"
                variant="success"
                onClick={this.handleFinish}
              >Finish</Button>
              )}
         </div>
        );
    }
  }
}

export default Quiz;