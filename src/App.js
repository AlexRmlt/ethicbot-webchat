import React, { Component } from 'react';
import './App.css';
import { Widget } from 'rasa-webchat';
import theme from './Widget.css'

class Header extends Component {
	render() {
		return (
			<div className="Header">
				<p>-Ethicbot-</p>
			</div>
		);
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Widget 
					initPayload={"/greeting"}
	      			socketUrl={"http://localhost:5038"}
	      			socketPath={"/socket.io/"}
	      			embedded={true}
	      			params={{storage: "session"}}
	      			theme={theme}
				/>
			</div>
      	);
	}
}

export default App;
