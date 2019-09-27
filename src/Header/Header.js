import React from 'react';
import './Header.css';



class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {date: new Date()}
		
	}


	componentDidMount() {
		this.timerId = setInterval(() => {
			this.tick()
		}, 1000)
	}


	componentWillUnmount() {
		clearInterval(this.timerId)
	}


	tick() {
		this.setState({
			date: new Date()
		})
	}


	render() {
		return (
			<header>
			  	<div className="header_wrapper">
			  	  	<h1 className='title'>2doList by SoloWAY</h1>
			  	  	<div className="date">
						<p>{this.state.date.toLocaleTimeString()}</p>
			  	  	  	<p>{this.state.date.toLocaleDateString()}</p>
			  	  	</div>
			  	</div>
			</header>
		)
	}
}



export default Header;