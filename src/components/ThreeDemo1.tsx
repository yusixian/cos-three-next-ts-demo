'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Fluid, useConfig } from './fluid';
import CenterLogo from './ui/CenterLogo';
import { EffectComposer } from '@react-three/postprocessing';

export default function ThreeDemo1() {
  const config = useConfig();
  return (
    <div className="bg-zinc-900">
      ThreeDemo #1 Fluid Cursor Effect
      <Canvas
        id="three-demo-1"
        style={{ height: '100vh', position: 'fixed', top: 0, left: 0, width: '100vw' }}
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          stencil: false,
          powerPreference: 'high-performance',
        }}
      >
        <directionalLight position={[0, 5, 5]} intensity={Math.PI / 2} />
        <ambientLight position={[0, 0, 5]} intensity={Math.PI / 2} />
        <Suspense>
          <CenterLogo />
        </Suspense>
        <EffectComposer>
          <Fluid {...config} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
