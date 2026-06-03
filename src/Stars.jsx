import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";

import starOneModel from "./images/starOne.glb";
import starTwoModel from "./images/starTwo.glb";
import starThreeModel from "./images/starThree.glb";

function Star({ model, position, scale = 1, speed = 0.5 }) {
  const groupRef = useRef();
  const modelRef = useRef();
  const { scene } = useGLTF(model);

  useFrame((state, delta) => {
    if (!modelRef.current || !groupRef.current) return;

    // spin around its own Y axis
    modelRef.current.rotation.y += delta * speed;

    // optional tiny float, but the star stays anchored
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
  });

  const handleClick = () => {
    gsap.fromTo(
      groupRef.current.scale,
      { x: scale, y: scale, z: scale },
      {
        x: scale * 1.25,
        y: scale * 1.25,
        z: scale * 1.25,
        duration: 0.2,
        repeat: 1,
        yoyo: true,
        ease: "back.out(2)",
      },
    );
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive
        ref={modelRef}
        object={scene.clone()}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      />
    </group>
  );
}

export default function Stars() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <ambientLight intensity={2} />
      <directionalLight position={[3, 4, 5]} intensity={2} />

      <Star
        model={starOneModel}
        position={[1, 1.5, -1]}
        scale={0.75}
        speed={0.3}
      />

      <Star
        model={starTwoModel}
        position={[3, -1, 0]}
        scale={0.75}
        speed={0.35}
      />

      <Star
        model={starThreeModel}
        position={[-1, -1, 0]}
        scale={0.75}
        speed={0.6}
      />
    </Canvas>
  );
}
