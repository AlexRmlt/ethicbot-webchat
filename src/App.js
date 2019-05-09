import React, { Component } from 'react';

import './App.css';
import './DarkMode.css';
import theme from './Widget.css'

import { Widget } from 'rasa-webchat';
import Header from './Header';
import SideBar from "./sidebar";

/* 	Dev: 	socketUrl={"http://localhost:8080"}
	Prod:	socketUrl={"http://80.190.117.198:8080"} */

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
			      		socketUrl={"http://80.190.117.198:8080"}
			      		socketPath={"/socket.io/"}
			      		embedded={true}
			      		params={{storage: "session"}}
			      		theme={theme}
					/>
				</div>
			</div>
      	);
	}
}

export default App;