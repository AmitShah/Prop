import React, {useRef} from 'react';
import {Button,Card}  from 'react-bootstrap';
import * as THREE from "three";

class LeaderBoard extends React.Component {

  componentDidMount(){
     var loader = new THREE.CanvasTexture();
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
    </Card>
    );
  
   }
 }

export default LeaderBoard;
