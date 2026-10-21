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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100dvh",
          backgroundColor: "#000",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(100vw, calc(100dvh * 16 / 9))",
            height: "min(100dvh, calc(100vw * 9 / 16))",
            overflow: "hidden",
          }}
        >
          {/* <div style={{ width: "100vw", maxWidth: "", height: "100vh" }}> */}
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
            <Box x={-1} y={0} z={-2} meshColor={"red"} />
            <Box x={3} y={0} z={-2} meshColor={"blue"} />
            {/* BOXES Row 2 */}
            <Box x={-1} y={0} z={1.5} meshColor={"green"} />
            <Box x={3} y={0} z={1.5} meshColor={"white"} />
            {/* BOXES Row 3 */}
            <Box x={-1} y={0} z={5} meshColor={"black"} />
            <Box x={3} y={0} z={5} meshColor={"pink"} />
            <Gltf src="3d/spaceTrue.glb" position={[0, -0.5, 0]} />
            <OrbitControls enableZoom={true} enableRotate={true} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
