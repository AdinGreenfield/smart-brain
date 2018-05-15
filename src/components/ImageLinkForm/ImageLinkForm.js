 import React from 'react';
 import './ImageLinkForm.css';

 const ImageLinkForm = ( { onInputChange, onSubmit  }) => {
 	return (
 			<div>
 				<p className='f4 pa2'>
 					{'This Magic Brain will detect faces in your pictures. Give it a try.'}
 				</p>
 				<div>
 					<div className='form shadow-5 br3 pa3 center'>
 					<input className='pa2 w-70'type='url' onChange={onInputChange} />
 					<button value='submit' className='grow bg-light-green link ph3 pv2 div black' onClick={onSubmit}>Detect</button>
 					</div>
 				</div>
 			</div>
 		);
 }

 export default ImageLinkForm;