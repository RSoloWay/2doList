import React from 'react';
import './App.css';
import Body from './Body/Body';
import Header from './Header/Header';
import Weather from './Weather/Weather';
import Footer from './Footer/Footer';


function test() {
	let z = window.innerWidth;
	console.log(z)
	if (z <= 576) {
		let x = document.querySelector('.appWrapper');
		console.log(x);
		let a = window.innerHeight;
		console.log(a)
		x.style.height = a + 'px';
	}

	
}


function App() {
  	return (
		<div onLoad={test} className='appWrapper'>
			<Header/>
			<Body/>
			<Weather/>
			<Footer/>
		</div>
  	)
}

export default App;
