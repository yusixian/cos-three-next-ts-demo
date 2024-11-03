import { useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { Center, Svg } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls, folder } from "leva";

export default function CenterLogo() {
  const { pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const controls = useControls({
    初始设置: folder({
      scale: { value: 0.05, min: 0.01, max: 0.4, step: 0.005 },
      initialPositionZ: { value: -5, min: -10, max: 0, step: 0.1 },
    }),
    动画参数: folder({
      positionRange: { value: 0.15, min: 0, max: 1, step: 0.01 },
      rotationRange: {
        value: Math.PI / 32,
        min: 0,
        max: Math.PI / 2,
        step: 0.01,
      },
      animationDuration: { value: 0.8, min: 0, max: 2, step: 0.1 },
      animationEase: {
        value: "power2.out",
        options: [
          "none",
          "power1.out",
          "power2.out",
          "power3.out",
          "elastic.out",
          "bounce.out",
        ],
      },
    }),
  });

  useFrame(() => {
    if (!groupRef.current) return;
    const positionX = THREE.MathUtils.mapLinear(
      pointer.x,
      -1,
      1,
      -controls.positionRange,
      controls.positionRange
    );
    const positionY = THREE.MathUtils.mapLinear(
      pointer.y,
      -1,
      1,
      -controls.positionRange,
      controls.positionRange
    );
    const rotationX = THREE.MathUtils.mapLinear(
      pointer.y,
      -1,
      1,
      controls.rotationRange,
      -controls.rotationRange
    );
    const rotationY = THREE.MathUtils.mapLinear(
      pointer.x,
      -1,
      1,
      controls.rotationRange,
      -controls.rotationRange
    );
    gsap.to(groupRef.current.position, {
      x: positionX,
      y: positionY,
      duration: controls.animationDuration,
      ease: controls.animationEase,
    });
    gsap.to(groupRef.current.rotation, {
      x: rotationX,
      y: rotationY,
      duration: controls.animationDuration,
      ease: controls.animationEase,
    });
  });

  return (
    <Center ref={groupRef} position={[0, 0, controls.initialPositionZ]}>
      <Svg
        scale={controls.scale}
        src="/svg/logo.svg"
        fillMaterial={new THREE.MeshBasicMaterial({ color: "#D63965" })}
      />
    </Center>
  );
}
