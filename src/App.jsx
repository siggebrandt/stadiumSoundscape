import { useState, useEffect, useRef } from "react";
import { Billboard } from "@react-three/drei";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Gltf } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { Raycaster } from "three";
import { ContactShadows } from "@react-three/drei";

import "./App.css";
import { Group } from "three/examples/jsm/libs/tween.module.js";

function CameraSetup() {
  const camera = useThree().camera;
  useEffect(() => {
    camera.lookAt(0, 1, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
}

function Box({ x, y, z, meshColor }) {
  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      {/* <boxGeometry /> */}
      <meshLambertMaterial color={meshColor} />
    </mesh>
  );
}

function Sphere({ x, y, z, meshColor }) {
  const borderRef = useRef();
  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={meshColor} />
      </mesh>

      <Billboard>
        <mesh ref={borderRef}>
          <ringGeometry args={[0.23, 0.26, 32]} />
          <meshBasicMaterial color={meshColor} transparent opacity={0.6} />
        </mesh>
      </Billboard>
    </group>
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
          backgroundColor: "#00000000",
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
            style={{ background: "red" }}
            camera={{
              position: [4.5, 2.8, 4.5], // x y z
              fov: 60,
            }}
          >
            <CameraSetup />
            <ambientLight intensity={1} />
            <ContactShadows
              position={[0, 0, 0]}
              opacity={1}
              scale={1}
              blur={1}
            />

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
            {/* SPHERE */}
            <Sphere x={3} y={0} z={2} meshColor={"purple"} />

            <Gltf src="3d/spaceX.glb" position={[0, -0.5, 0]} scale={3} />

            {/* remove after testing */}
            <OrbitControls
            /* enableZoom={false}
              enableRotate={false}
              enablePan={false} */
            />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
