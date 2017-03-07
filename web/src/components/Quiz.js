import React, { Component } from 'react';
import Page from './Page';
import QuestionTitle from './QuestionTitle';
import QuizAnswer from './QuizAnswer';
import quizQuestions from '../api/quizQuestions';
import update from 'immutability-helper';
class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questions: [...quizQuestions],
            currentQuestion: 1,
            answers: [],
            colors: ['#393939', '#FF9F00', '#00AD27'],
            currentColor: ''
        }
    }

    nextQuestion(e) {
        e.preventDefault();
        this.setState({ ...this.state, currentQuestion: this.state.currentQuestion + 1, currentColor: this.getRandomColor() })
    }
    prevQuestion(e) {
        e.preventDefault();
        this.setState({ ...this.state, currentQuestion: this.state.currentQuestion - 1, currentColor: this.getRandomColor() })
    }

    hasNext() {
        return (this.state.currentQuestion >= this.state.questions.length);
    }

    hasPrev() {
        return (this.state.currentQuestion === 1);
    }

    hasAnswer() {
        return !(this.state.answers.length >= this.state.currentQuestion);
    }

    handleChecked(data) {
        let newState;
        if (this.state.answers.length === 0) {
            newState = update(this.state, {
                answers: {
                    $push: [data]
                }
            });
        } else {
            newState = update(this.state, {
                answers: {
                    [this.state.currentQuestion - 1]: { $set: data }
                }
            });
        }


        this.setState(newState);
    }

    finishQuiz(answers){
        this.props.finishQuiz(this.state.answers);
    }

    getRandomColor() {
        return this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    }
    render() {
        let questions = [...this.state.questions];
        let currentQuestion = this.state.currentQuestion;
        let answers = this.state.answers;
        let currentColor = this.state.currentColor;
        return (
            <Page color={currentColor} className="">
                <div className="wrap container">

                    <div className="row center-xs">
                        <QuestionTitle question={questions[currentQuestion - 1].question} />
                        <div className="col-xs-12">
                            {
                                questions[currentQuestion - 1].answers.map((val, index) => <QuizAnswer handleChecked={this.handleChecked.bind(this)} checked={index === answers[currentQuestion - 1]} answer={val.content} answerId={index} key={`a${index}-${currentQuestion}`} />)
                            }
                        </div>
                    </div>
                    <div className="row center-xs">
                        <button href="#" target="_BLANK" className="btn btn-warning btn-lg col-xs-5" onClick={this.prevQuestion.bind(this)} disabled={this.hasPrev()}><i className="fa fa-chevron-left" aria-hidden="false"></i></button>
                        {
                            (currentQuestion >= questions.length) ? <FinishedButton finishQuiz={this.finishQuiz.bind(this)} disabled={this.hasAnswer()}>Färdig</FinishedButton> :
                                <NextButton nextQuestion={this.nextQuestion.bind(this)} disabled={(this.hasNext() || this.hasAnswer())}>
                                    <i className="fa fa-chevron-right" aria-hidden="false"></i>
                                </NextButton>
                        }
                    </div>
                </div>
            </Page>
        );
    }
}

const NextButton = (props) => {
    return (
        <button href="#" target="_BLANK" className="btn btn-warning btn-lg col-xs-5" onClick={props.nextQuestion} disabled={props.disabled}>{props.children}</button>
    )
}

const FinishedButton = (props) => {
    return (
        <button href="#" target="_BLANK" className="btn btn-warning btn-lg col-xs-5 success" onClick={props.finishQuiz} disabled={props.disabled}>{props.children}</button>
    )
}
export default Quiz;