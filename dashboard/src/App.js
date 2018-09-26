import React, { Component } from 'react'
import './App.css'
import Scanner from './components/Scanner'
import Dashboard from './components/Dashboard'
import { Route } from 'react-router-dom'
import FrontPage from './components/FrontPage'
import VotingPage from './components/VotingPage'
import Thankyou from './components/Thankyou'

class App extends Component {
  state = {
    candidates: [
      [
        "1",
        "Candidate 1",
      ],
      [
        "2",
       "Candidate 2",
      ]
    ],
    voter: {}
  }

  onIdentification = (voter) => {
    this.setState({
      voter: {
        ...voter,
        candidateId: 0,
      }
    });
  }

  onVote = (id) => {
    this.setState({
      voter: {
        ...this.state.voter,
        candidateId: id
      }
    }, () => console.log(this.state));
  }

  render() {
    return (
      <div className='App'>
        <Route exact path='/' render={()=> <FrontPage/> }/>
        <Route exact path='/scan' render={() => (
          <Scanner
          voter={this.state.voter}
          onIdentification={(voter) => this.onIdentification(voter)}
          />
        )}/>
        <Route exact path='/dashboard' render={() => <Dashboard/> }/>
        <Route path='/vote' render={({ history }) => (
          <VotingPage
          goBack = {()=>(history.push('/scan'))}
          vote={(candidateId) => this.onVote(candidateId)}
          voter={this.state.voter}
          candidates={this.state.candidates}
          />
        )}/>
      </div>
    )
  }
}

export default App