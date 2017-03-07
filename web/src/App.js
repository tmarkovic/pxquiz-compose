import React, { Component } from 'react';
import Page from './components/Page';
import Quiz from './components/Quiz';
import ContactForm from './components/ContactForm';
import submitResult from './api/submitResult';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      answers: [],
      user: {},
      isLoading: false,
      error: false,
    }
  }
  nextPage() {
    this.setState({
      page: this.state.page + 1,
    });
  }

  finishQuiz(answers) {
    this.setState({
      page: this.state.page + 1,
      answers: answers
    })
  }

  submitQuiz(user) {
    this.setState({
      isLoading: true,
    })
    submitResult({
      answers: this.state.answers,
      ...user
    }).then(result => {
      if (result.ok) {
        this.setState({ page: this.state.page + 1 });
        return;
      }
      this.setState({ isLoading: false, error: true })
      setTimeout(() => {
        this.setState({ error: false })
      }, 1500);
    })
  }
  render() {
    switch (this.state.page) {
      case 1:
        return (<Page ref="a" color="#00AD27">
          <div className="row center-xs">
            <h1 className="hero__headline col-xs-12">PayEx-Quiz</h1>
            <p className="hero__byline col-xs-12">Svara på 5 snabba frågor om PayEx och ta chansen att vinna en biljett till vår After Work, <b>vi bjuder!</b></p>
            <a href="#" onClick={this.nextPage.bind(this)} className="btn btn-warning btn-lg col-xs-12 col-md-6 col-lg-4">
            Kör igång!
            </a>
          </div>
        </Page>
        )
      case 2:
        return <Quiz finishQuiz={this.finishQuiz.bind(this)} />
      case 3:
        return (
          <Page ref="c" color="#393939">
            <div className="row center-xs">
              <p className="hero__byline col-xs-12">{this.state.error ? "Oj något gick visst fel" : "Vi kontaktar vinnarna inom kort med mer information om datum och detaljer"}</p>
            </div>
            <ContactForm submitQuiz={this.submitQuiz.bind(this)} isLoading={this.state.isLoading} error={this.state.error} />
          </Page>
        )
      case 4:
        return (
          <Page ref="a" color="#00AD27">
            <div className="row center-xs">
              <h1 className="hero__headline col-xs-12">En sista sak!</h1>
              <p className="hero__byline col-xs-12 col-lg-12">Registrera ditt CV på vår hemsida, lämna en öppen ansökan eller sök en av våra vakanser.<br /> Lycka Till!</p>
              <a href="http://payex.se/om-payex/jobba-paa-payex/" className="btn btn-warning btn-lg col-xs-12 col-md-6 col-lg-4">Ta mig till Jobbansökan</a>

            </div>
          </Page>
        )
      default:
        return 0;
    }
  }
}

export default App;
