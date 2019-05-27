import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

import './App.css';
import './DarkMode.css';
import theme from './Widget.css'

import { Widget } from 'rasa-webchat';
import Header from './Header';
import SideBar from './Sidebar';


class App extends Component {
	render() {
		return (
			<div className="App">
				<SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
				<div id="page-wrap">
					<Header />
					<Widget 
						interval={2000}
						initPayload={"/greeting"}
			      		socketUrl={"https://ethicbot.ddns.net/"}
			      		socketPath={"/socket.io/"}
			      		embedded={true}
			      		params={{storage: "session"}}
			      		theme={theme}
					/>
					<CookieConsent
						buttonClasses="disclaimer-button"
					>
					    By talking to the chatbot, you accept that conversations are stored for evaluation purposes. 
					    Please be careful when providing personal information.
					</CookieConsent>
				</div>
			</div>
      	);
	}
}

export default App;