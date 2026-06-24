"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const Brain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.1;
      wireframeRef.current.rotation.x = Math.sin(t * 0.05) * 0.2;
    }
  });

  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.5, 1);
    return new THREE.EdgesGeometry(geo);
  }, []);

  return (
    <group>
      <mesh ref={meshRef}>
        <Icosahedron args={[2.4, 1]}>
          <MeshDistortMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.2}
            transparent
            opacity={0.1}
            distort={0.25}
            speed={1.5}
          />
        </Icosahedron>
      </mesh>

      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial color="#D4AF37" transparent opacity={0.6} />
      </lineSegments>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 8, 48]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.015, 8, 48]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

interface WireframeBrainProps {
  className?: string;
}

const WireframeBrain = ({ className = "" }: WireframeBrainProps) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D1FF" />
        <Brain />
      </Canvas>
    </div>
  );
};

export default WireframeBrain;