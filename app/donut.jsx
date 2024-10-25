"use client";
import { AsciiRenderer, Effects, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function SpinningDonut() {
  let donutRef = useRef();

  useFrame(() => {
    if (donutRef.current) {
      donutRef.current.rotation.x += 0.01;
      donutRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={donutRef}>
      <torusGeometry args={[2, 0.6, 12, 32]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export default function () {
  return (
    <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 2]}>
      <directionalLight position={[0, 10, 0]} intensity={0.4} />
      <directionalLight position={[10, 0, 10]} intensity={0.5} />
      <SpinningDonut />
      <OrbitControls enableRotate enablePan={false} enableZoom={false} />
      <Effects disableRenderPass>
        <AsciiRenderer invert characters="@$#*!=;:~-,. " bgColor="#000000" />
      </Effects>
    </Canvas>
  );
}
