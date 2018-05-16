import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';  
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';  
import Celebrity from './components/Celebrity/Celebrity.js';
import Signin from './components/Signin/Signin.js';  
import Register from './components/Register/Register.js';  
import { PARTICLE_OPTIONS } from './particleOptions';
import './App.css';
import 'tachyons';

const initialState = {
  input: '',
  imageURL: '', 
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super()
    this.state = {
      input: '',
      imageURL: '', 
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaces = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box});
  }


  calculateCelebrities = (data) => {
    const celeb = data.outputs[0].data.regions[0].data.face.identity.concepts[0].name;
    const val = data.outputs[0].data.regions[0].data.face.identity.concepts[0].value * 100;
    const text = document.getElementById('textunderpicture');
    console.log(text);
    text.textContent=`We are ${val}% sure this is ${celeb}.`;
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch('https://radiant-reaches-15611.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json()) 
    .then(response => {
      if (response){
        fetch('https://radiant-reaches-15611.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
         this.setState(Object.assign(this.state.user, { entries: count}))
       })
        .catch(console.log)
        
      }
      this.calculateCelebrities(response);
      this.displayFaceBox(this.calculateFaces(response));
    })
    .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if(route === 'home'){
      this.setState({isSignedIn: true});
    }
    else if (route === 'signout'){
      this.setState(initialState);
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageURL, box, route} = this.state;

    return (
      <div className="App">
      <Particles className='particles'
      params={PARTICLE_OPTIONS} 
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

      { route === 'home'
      ? <div>
      <Logo />
      <Rank name= {this.state.user.name} 
      entries = {this.state.user.entries}
      />
      <ImageLinkForm 
      onInputChange= {this.onInputChange} 
      onSubmit={this.onSubmit} />
      <Celebrity />
      <FaceRecognition  imageURL={imageURL} box= {box} />
      </div> 
      : (
        route === 'signin'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        : (
          route === 'register'
          ? <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> )
        )
    }
    </div>
    );
  }
}

export default App;
