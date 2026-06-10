import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import lolli from "./images/lollipop.glb";

function Lollipop() {
  const groupRef = useRef();
  const modelRef = useRef();
  const { scene } = useGLTF(lolli);

  useEffect(() => {
    const section = document.querySelector(".credentials-section");

    if (!section || !groupRef.current || !modelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const tl = gsap.timeline();

        tl.fromTo(
          groupRef.current.position,
          { x: -8, y: 1.8, z: 0 },
          {
            x: 1,
            y: 1.8,
            z: 0,
            duration: 3.2,
            ease: "power4.out",
          },
          0,
        );

        tl.fromTo(
          modelRef.current.rotation,
          { y: 0 },
          {
            y: Math.PI * 6.25,
            duration: 3.05,
            ease: "power3.out",
          },
          0,
        );

        tl.to(
          groupRef.current.rotation,
          {
            z: 0.18,
            duration: 0.65,
            ease: "sine.out",
          },
          2.35,
        );

        tl.to(groupRef.current.rotation, {
          z: 0.11,
          duration: 0.35,
          ease: "sine.inOut",
        });

        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (!groupRef.current || !modelRef.current) return;

    gsap
      .timeline()
      .to(groupRef.current.position, {
        y: 2.15,
        duration: 0.18,
        ease: "power2.out",
      })
      .to(groupRef.current.position, {
        y: 1.8,
        duration: 0.45,
        ease: "bounce.out",
      });

    gsap.to(modelRef.current.rotation, {
      y: "+=1.2",
      duration: 0.65,
      ease: "power2.out",
    });
  };

  return (
    <group
      ref={groupRef}
      position={[-8, 1.8, 0]}
      rotation={[0, 0, 0]}
      scale={0.65}
      onClick={handleClick}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "default")}
    >
      <primitive ref={modelRef} object={scene} />
    </group>
  );
}

export default function LollipopScene() {
  return (
    <div className="lollipop-scene">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 5, 5]} intensity={2} />
        <pointLight position={[-3, 2, 4]} intensity={1.5} />
        <Environment preset="studio" />
        <Lollipop />
      </Canvas>
    </div>
  );
}
