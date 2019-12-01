import React, { Suspense, useEffect, useRef, useState, useMemo} from 'react'
import {Button,Card}  from 'react-bootstrap';
import * as THREE from "three";
import { Canvas, useLoader, useFrame, useUpdate, extend,useThree } from 'react-three-fiber'
import TTFLoader from '../TTFLoader';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'


// Makes these prototypes available as "native" jsx-string elements
extend({ EffectComposer, ShaderPass, RenderPass, UnrealBloomPass, FilmPass, GlitchPass })

function Effect() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), [size])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 0.3, 0.1, 0.1]} />
      <filmPass attachArray="passes" args={[0.25, 0.4, 1500, false]} />
      <glitchPass attachArray="passes" factor={1} />
    </effectComposer>
  )
}

//import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';

//require("opentype.js");

function Text({ children, vAlign = 'center', hAlign = 'center', size = 1, color = '#000000',font, ...props }) {
 
  //const font = useLoader(THREE.FontLoader, bold)
  const config = useMemo(
    () => ({
      font,
      size: 80,
      height: 0,
      curveSegments: 32,
      bevelEnabled: false,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font]
  )

  const mesh = useUpdate(
    self => {
      const size = new THREE.Vector3()
      self.geometry.computeBoundingBox()
      self.geometry.boundingBox.getSize(size)
      self.position.x = hAlign === 'center' ? -size.x / 2 : hAlign === 'right' ? 0 : -size.x
      self.position.y = vAlign === 'center' ? -size.y / 2 : vAlign === 'top' ? 0 : -size.y
    },
    [children]
  )
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry attach="geometry" args={[children, config]} />
        <meshNormalMaterial attach="material" />
      </mesh>
    </group>
  )
}

function Jumbo({font}) {
  const ref = useRef()
  useFrame(
    ({ clock }) =>
      (ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z =
        Math.sin(clock.getElapsedTime()) * 0.8)
  )
  return (
    <group ref={ref}>
      <Text font={font} hAlign="center" position={[0, /*4.2*/0, 0]} children="PROP" />
      
    </group>
  )
}

class LeaderBoard extends React.Component {


  componentDidMount(){
     
     const loader = new TTFLoader();
     const fontLoader = new THREE.FontLoader();
     //assets/fonts/Jackerton-Free-Regular.otf
     const fontName = "/assets/fonts/FugazOne-Regular.ttf";//Jackerton-Free-Regular.otf";
     loader.load(fontName,fnt => this.setState({font: fontLoader.parse(fnt)}));
     
  }




  render(){

    return(
    <div>
    <div className="row">
      <div className="col-12">
      { this.state && this.state.font &&
      <Canvas
        camera={{ position: [0, 0, 35] }}
        style={{ background: '#f8f7f3', height:"50vh" }}

        > //'radial-gradient(at 50% 60%, #f8f7f3 0%, #f8f7f3 100%)' }}>
        <ambientLight intensity={2} />
        <pointLight position={[40, 40, 40]} />
        <Suspense fallback={null}>
          <Jumbo font={this.state.font} />
          
        </Suspense>
        <Effect />
      </Canvas>
      }
      </div>
    </div>
    <div className="row">
      <div className="col-4">
        <Card style={{ width: '10em' }}>
   
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
      </div>
    </div>
    </div>
    
   
    );
  
   }
 }

export default LeaderBoard;
