import React from 'react';
import './App.css';
import Body from './Body/Body';
import Header from './Header/Header';
import Weather from './Weather/Weather';
import Footer from './Footer/Footer';
// import Test from './Test';



function App() {
  	return (
		<div>
			<Header/>
			<Body/>
			<Weather/>
			<Footer/>
			{/* <Test /> */}
		</div>
  	)
}

export default App;
