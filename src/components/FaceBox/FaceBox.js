 import React from 'react'; 
 import './FaceBox.css';

 const FaceBox = ({ inputBox }) => {

 	console.log('box', inputBox);

 		if(!inputBox.length){
 			return <div></div>
 		}
 		else{ 	
 			console.log('facebox is running');	
 			return (<div className='bounding-box' style={{top: inputBox[0].region_info.bounding_box.topRow, right: inputBox[0].region_info.bounding_box.rightCol, bottom: inputBox[0].region_info.bounding_box.bottomRow, left: inputBox[0].region_info.bounding_box.leftCol}}></div>);
 	}

 }

 export default FaceBox;