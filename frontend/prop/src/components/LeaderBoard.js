import React, {useRef} from 'react';
import {Button,Card}  from 'react-bootstrap';
import * as THREE from "three";
import TTFLoader from '../TTFLoader';


class LeaderBoard extends React.Component {

  componentDidMount(){
     var canvasTexture = new THREE.CanvasTexture();
     const loader = new TTFLoader();
     const fontLoader = new THREE.FontLoader();
     var font = null;
     loader.load('/assets/fonts/fontawesome-webfont.ttf',fnt => font = fontLoader.parse(fnt))
     
  }


  render(){

    return(
  
    <Card style={{ width: '18rem' }}>
 
      <Card.Body>
        <Card.Title>LEADERBOARD</Card.Title>
        <Card.Text>
          People will go here
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
       <div
        style={{ width: "800px", height: "800px" }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    </Card>
   
    );
  
   }
 }

export default LeaderBoard;
