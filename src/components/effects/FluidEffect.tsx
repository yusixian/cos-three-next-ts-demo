import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { FluidShader } from "../shaders/FluidShader";
import {
  EffectComposer,
  RenderPass,
  ShaderPass,
} from "three/examples/jsm/Addons.js";

export function FluidEffect() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef<EffectComposer>();
  const bulgePass = useRef<ShaderPass>();
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    composer.current.addPass(renderPass);

    bulgePass.current = new ShaderPass(FluidShader);
    bulgePass.current.uniforms.uResolution.value.set(size.width, size.height);
    composer.current.addPass(bulgePass.current);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX / window.innerWidth;
      mouse.current.y = 1 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gl, scene, camera, size]);

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame((state) => {
    if (composer.current && bulgePass.current) {
      // 逐渐减小速度
      bulgePass.current.uniforms.uVelocity.value.multiplyScalar(0.9);

      bulgePass.current.uniforms.uTime.value = state.clock.elapsedTime;
      bulgePass.current.uniforms.uMouse.value.copy(mouse.current);
      composer.current.render();
    }
  }, 1);

  return null;
}
