import React, { useRef, useState, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SoundSphere({
  position,
  color,
  soundName = "soundEffects.mp3",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const pointsRef = useRef();
  const coreRef = useRef();

  // Ljudmotor refs
  const audioRef = useRef(null);
  const ctxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  // 1. Skapa en sfär med tusentals partikel-punkter
  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.35, 72, 72), []);
  const origPositions = useMemo(
    () => sphereGeom.attributes.position.array.slice(),
    [sphereGeom],
  );

  // 2. Play / Pause
  function togglePlay(e) {
    e.stopPropagation();

    if (!audioRef.current) {
      const audio = new Audio(`/sound/${soundName}`);
      audio.crossOrigin = "anonymous";
      audio.loop = true;

      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.8;

      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioRef.current = audio;
      ctxRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // 3. Få partiklarna att vibrera i stående ljudvågor (Cymatics)
  useFrame(({ clock }) => {
    if (!isPlaying || !analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const data = dataArrayRef.current;
    const geom = pointsRef.current.geometry;
    const pos = geom.attributes.position;
    const count = pos.count;
    const time = clock.getElapsedTime() * 1.5;
    // 1. Räkna ut bas och mellanregister FÖRST
    const bas = data[0] / 255;
    const mellan = (data[10] || 0) / 128;
    // 2. Skala nu kärnan med basen!
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + bas * 0.25);
    }

    for (let i = 0; i < count; i++) {
      const ox = origPositions[i * 3];
      const oy = origPositions[i * 3 + 1];
      const oz = origPositions[i * 3 + 2];

      // Normaliserad 3D-riktning
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;

      // Akustiska nod-linjer (skapar de där elektriska ådrorna från din bild!)
      const cymaticWave =
        Math.sin(nx * 8 + time) *
        Math.cos(ny * 8 - time * 0.5) *
        Math.sin(nz * 8 + time);

      // Partiklarna dras mot nod-linjerna vid ljud
      const displacement = 1 + bas * 0.4 + cymaticWave * (0.15 + mellan * 0.25);

      pos.setXYZ(i, ox * displacement, oy * displacement, oz * displacement);
    }

    pos.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* Klick-fångare (osynlig sfär inuti så den är lätt att klicka på) */}
      {/* DEN INRE LYSANDE KÄRNAN */}
      <mesh
        ref={coreRef}
        onClick={togglePlay}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "auto")}
      >
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent={true}
          opacity={isPlaying ? 0.6 : 0.25} // Mjuk och halvgenomskinlig
          blending={THREE.AdditiveBlending} // NormalBlending
          depthWrite={false}
        />
      </mesh>

      {/* DET AKUSTISKA PARTIKEL-KLOTET */}
      <points ref={pointsRef} geometry={sphereGeom}>
        <pointsMaterial
          color={color}
          size={0.012} // Små distinkta ljudprickar
          transparent={false}
          opacity={2}
          blending={THREE.AdditiveBlending} // NormalBlending || AdditiveBlending
          depthWrite={false}
        />
      </points>
    </group>
  );
}
