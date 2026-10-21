import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Gltf } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Raycaster } from "three";

import "./App.css";

function CameraControl() {
  const camera = useThree().camera;
  console.log(camera);
}

function Box({ x, y, z, meshColor }) {
  return (
    <mesh position={[x, y, z]}>
      <boxGeometry /> {/* <boxBufferGeometry attach="geometry" /> */}
      <meshLambertMaterial color={meshColor} />
    </mesh>
  );
}

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas
          camera={{
            //lookAt: [0, 0, 0],
            position: [5, 6, 6], // x y z /* [4.5, 0, 4] */,
            fov: 80,
            rotation: [600, 0, 0],
          }}
        >
          <CameraControl />
          <ambientLight intensity={1} />

          {/* BOXES */}
          {/* BOXES Row 1 */}
          <Box x={-1.5} y={0} z={-1.8} meshColor={"red"} />
          <Box x={1.5} y={0} z={-1.8} meshColor={"blue"} />
          {/* BOXES Row 2 */}
          <Box x={-1.5} y={0} z={0.8} meshColor={"green"} />
          <Box x={1.5} y={0} z={0.8} meshColor={"white"} />
          {/* BOXES Row 3 */}
          <Box x={1.5} y={0} z={2} meshColor={"black"} />
          <Box x={-1.5} y={0} z={2} meshColor={"pink"} />
          <Gltf src="3d/spaceTrue.glb" position={[0, -0.5, 0]} />
          <OrbitControls enableZoom={false} enableRotate={true} />
        </Canvas>
      </div>
    </>
  );
}

export default App;
