"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function CoreMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} scale={2}>
        <torusKnotGeometry args={[1, 0.3, 80, 12]} />
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 280;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      const value = Math.sin(i * 12.9898) * 43758.5453;
      pos[i] = (value - Math.floor(value) - 0.5) * 30;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial size={0.05} color="#22d3ee" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#3b82f6" />
        <CoreMesh />
        <Particles />
      </Canvas>
    </div>
  );
}
