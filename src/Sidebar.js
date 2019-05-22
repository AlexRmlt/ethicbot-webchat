import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import DarkModeToggle from './DarkModeToggle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Sidebar.css';

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
			    	<button className="bm-item" onClick={() => this.setState({menuOpen: false})}>Home</button>
			    	<br />
			      	<button className="bm-item" onClick={() => this.setState({showAbout: true})}>About</button>

			      	<br />
			      	<hr />

			      	<DarkModeToggle />
			    </div>
			);
	    } else {
	        content = (
	        	<div key="about">
					<About />
					<hr />
					<button className="bm-item" onClick={() => this.setState({showAbout: false})}>Back</button>
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

export default Sidebar;