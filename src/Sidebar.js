import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import DarkModeToggle from './DarkModeToggle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Sidebar.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class About extends Component {
	render() {
		return (
			<div className="about">
				<h3>About</h3>
				<p>Master Thesis by Alexander Römelt</p>
                <p>Ruprecht-Karls-Universität Heidelberg</p>
				<p><b>GitHub:</b></p> 
				<p>github.com/AlexRmlt</p>

				<p><b>Contact:</b></p>
				<p>roemelt[at]stud.uni-heidelberg.de</p>
			</div>
      	);
	}
}

class Sidebar extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		showAbout: false,
    		menuOpen: false
    	};
  	}

	handleStateChange (state) {
    	this.setState({menuOpen: state.isOpen})  
  	}
  
	toggleMenu () {
    	this.setState(state => ({menuOpen: !state.menuOpen}))
  	}

    restartConversation() {
        
    }

	render() {
		const transitionOptions = {
			transitionName: "fade",
      		transitionEnterTimeout: 500,
      		transitionLeaveTimeout: 500
    	}

    	let content = undefined;
	    if (!this.state.showAbout) {
	        content = (
                <div key="home">
    			   	<Link to="/" onClick={() => this.setState({menuOpen: false})} className="bm-item">Home</Link>
    			   	<br />
    			   	<button onClick={() => this.setState({showAbout: true})} className="bm-item">About</button>
    			   	{ /* <br />
                    <Link to="/feedback" onClick={() => this.setState({menuOpen: false})} className="bm-item">Feedback</Link>
                    */ }
                    <br />
    			   	<hr />
                                            
                    {/* <button className="bm-item" onClick={() => this.restartConversation()}>Restart conversation</button>
                    <hr /> */}
   			      	<DarkModeToggle />
                </div>
			);
	    } else {
	        content = (
	        	<div key="about">
					<About />
					<hr />
					<button onClick={() => this.setState({showAbout: false})} className="bm-item">Back</button>
				</div>
	        );
	    } 

		return (
			<div>
				<Menu 
					disableAutoFocus
				    isOpen={this.state.menuOpen}
          			onStateChange={(state) => this.handleStateChange(state)}>
					<ReactCSSTransitionGroup {...transitionOptions}>
	            		{content}
	          		</ReactCSSTransitionGroup>
          		</Menu>
       		</div>
		);
	}
};

export { 
    Sidebar as default,
    Router, 
    Route
};