'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

function AnimatedGlobe() {
  const meshRef = useRef();
  const lightRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      // GSAP animation for smooth rotation
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime) * 3;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight ref={lightRef} position={[2, 2, 2]} intensity={1} />
      <pointLight position={[-2, -2, -2]} intensity={0.5} color="#4285f4" />
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#34a853" />
      
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#4285f4"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Wireframe overlay for Google colors effect */}
      <Sphere args={[1.01, 32, 32]}>
        <meshBasicMaterial
          attach="material"
          color="#ffffff"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Globe3D() {
  return (
    <div className="w-full h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AnimatedGlobe />
      </Canvas>
    </div>
  );
}
