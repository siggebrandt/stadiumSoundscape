import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard } from "@react-three/drei";

export default function SoundSphere({ position, color, soundName }) {
  const borderRef = useRef();
  let isPlaying = false;

  const audioRef = useRef();
  const analyserRef = useRef();
  const dataArrayRef = useRef();

  // Sound Engine
  function togglePlay() {
    if (!audioRef.current) /* true */ {
      const audio = new Audio(`/sound/${soundName}`);
      const ctx = new (window.AudioContext || window.webkitAudioContext)(); // audio context // ??
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64; // ??

      // (connector) mp3 -> analyser -> utgång
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioRef.current = audio;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount); // ??
    }

    // PLAY/ PAUSE
    if (isPlaying) {
      audioRef.current.pause();
      isPlaying = false;
    } else {
      audioRef.current.play();
      isPlaying = true;
    }
  }

  useFrame(() => {
    if (!isPlaying || !analyserRef.current || !borderRef.current) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const basVolym = dataArrayRef.current[0] / 255;

    borderRef.current.scale.setScalar(1 + basVolym * 0.9); // managing Billboard
  });

  return (
    <group position={position}>
      <mesh
        onClick={togglePlay}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <Billboard>
        <mesh ref={borderRef}>
          <ringGeometry args={[0.23, 0.26, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
      </Billboard>
    </group>
  );
}
