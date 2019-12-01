import React, {useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Canvas, useFrame } from 'react-three-fiber'
import PropBet from './components/PropBet';
import LeaderBoard from './components/LeaderBoard';
import ScoreBoard from './components/ScoreBoard';

function Thing() {
  const ref = useRef()
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Changning info now
        </p>
        <Button variant="primary">Test Button</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Canvas>
      <Thing />
    </Canvas>
    <PropBet></PropBet>
    <LeaderBoard />
    <ScoreBoard />
    </div>
  );
}

export default App;
