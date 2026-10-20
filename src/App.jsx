import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Gltf } from "@react-three/drei";

import "./App.css";

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
          <ambientLight intensity={1} />
          <mesh>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
          <Gltf src="3d/office.glb" position={[0, 0, 0]} />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}

export default App;
