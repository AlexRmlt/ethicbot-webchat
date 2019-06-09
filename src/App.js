import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

import './App.css';
import './DarkMode.css';
import theme from './Widget.css'

import { Widget, isVisible } from 'rasa-webchat';
import Header from './Header';
import Sidebar, { Router, Route } from './Sidebar';
import Feedback from './Feedback';

class AwayMessage extends Component {
	render() {
		return (
			<div className="AwayMessage">
				<p>The Chatbot is currently offline!</p>
			</div>
		);
	}
}

class Chatbot extends Component {
  	render() {
  		// Does not work yet!
		let awayMessage = isVisible ? null : <AwayMessage />;
		
		return (
			{awayMessage},
			<Widget 
				interval={2000}
				initPayload={"/greeting"}
				socketUrl={"https://ethicbot.ddns.net/"}
				socketPath={"/socket.io/"}
				embedded={true}
				params={{storage: "session"}}
				theme={theme}
			/>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router> 
					<Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
					<div id="page-wrap">
						<Header />
						
						<Route exact path="/" component={Chatbot} />
	                    <Route path="/feedback" component={Feedback} />

						<CookieConsent buttonClasses="disclaimer-button">
						    By talking to the chatbot, you accept that conversations are stored for evaluation purposes. 
						    Please be careful when providing personal information.
						</CookieConsent>
					</div>
				</Router>
			</div>
      	);
	}
}

export default App;