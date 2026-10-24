import { useEffect } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Gltf } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { Raycaster } from "three";
import SoundSphere from "./components/soundSphere.jsx";
import * as THREE from "three";

import "./App.css";

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
            gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
          >
            <CameraSetup />
            <ambientLight intensity={1} />
            <Environment preset="city" />
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={0.6}
              scale={10}
              blur={1.5}
              far={4}
            />

            {/* SPHERES */}
            {/* SPHERES Row 1 */}
            <SoundSphere position={[-1, 0, -2]} color={"red"} />
            <SoundSphere position={[3, 0, -2]} color={"blue"} />
            {/* Row 2 */}
            <SoundSphere position={[-1, 0, 1.5]} color={"green"} />
            <SoundSphere position={[3, 0, 1.5]} color={"white"} />
            {/* BOXES Row 3 */}
            <SoundSphere position={[-1, 0, 5]} color={"black"} />
            <SoundSphere position={[3, 0, 5]} color={"pink"} />
            {/* SPHERE */}
            {/* <SoundSphere
              position={[3, 0, 2]}
              color={"purple"}
              soundName={"soundEffects.mp3"}
            /> */}

            <Gltf src="3d/spaceX.glb" position={[0, -0.3, 0]} scale={3} />

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
