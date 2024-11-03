"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CenterLogo from "./ui/CenterLogo";
import { FluidEffect } from "./effects/FluidEffect";

export default function ThreeDemo1() {
  return (
    <div className="bg-zinc-900">
      ThreeDemo1
      <Canvas
        id="three-demo-1"
        style={{ height: "80vh" }}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
      >
        <directionalLight position={[0, 5, 5]} intensity={Math.PI / 2} />
        <ambientLight position={[0, 0, 5]} intensity={Math.PI / 2} />
        <Suspense>
          <CenterLogo />
        </Suspense>
        <FluidEffect />
      </Canvas>
    </div>
  );
}
