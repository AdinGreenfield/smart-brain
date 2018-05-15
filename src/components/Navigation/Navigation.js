 import React from 'react';
 import './Navigation.css'; 

 const Navigation = ({onRouteChange, isSignedIn}) => {
 	if(isSignedIn){
 	return (
 		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
 		<button className='grow ma3 f3 link dim black pa3 pointer bg-light-green br4' onClick={() => onRouteChange('signout')}>
 		Sign Out
 		</button>
 		</nav>
 		);
 	}
 	else{
 	return(
 		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
 		<button className='grow ma3 f3 link dim black pa3 pointer bg-light-green br4' onClick={() => onRouteChange('signin')}>
 		Sign In
 		</button>
 		<button className='grow ma3 f3 link dim black pa3 pointer bg-light-green br4' onClick={() => onRouteChange('register')}>
 		Register
 		</button>
 		</nav>
 		);
 	}
 }

 export default Navigation;