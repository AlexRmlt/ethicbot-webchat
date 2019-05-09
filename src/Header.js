import React, { Component } from 'react';
import logo from './img/logo.png';

class Header extends Component {
	render() {
		return (
			<div className="Header">
				<p>
					<img src={logo} alt="Uni HD" />
					<span>Ethicbot</span>
				</p>
			</div>
		);
	}
}

export default Header;
