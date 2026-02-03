import React, { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function PhysicsTest() {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hasDropped, setHasDropped] = useState(false);
  const sectionRef = useRef(null);

  // Define your projects
  const projects = [
    {
      name: "TicTacToad",
      url: "https://madscalls.github.io/tictactoad/",
      color: "#8f2280ff",
      size: 50,
    },
    {
      name: "Toro&Tide",
      url: "https://madscalls.github.io/toroandtide/",
      color: "#f7c309ff",
      size: 25,
    },
    {
      name: "RPS",
      url: "https://madscalls.github.io/RPS/",
      color: "#ff6b9d",
      size: 35,
    },
    {
      name: "Introspective Color",
      url: "https://ic.oops.wtf/",
      color: "#b09ef8",
      size: 40,
    },
  ];

  // Function to drop all circles
  const dropAllCircles = () => {
    if (!engineRef.current || !dimensions.width) return;

    projects.forEach((project, index) => {
      setTimeout(() => {
        const circle = Matter.Bodies.circle(
          (dimensions.width / (projects.length + 1)) * (index + 1),
          -50 - index * 100,
          project.size,
          {
            restitution: 0.6,
            friction: 0.1,
            render: {
              fillStyle: project.color,
              strokeStyle: "#ffffff",
              lineWidth: 3,
            },
          },
        );

        circle.projectUrl = project.url;
        circle.projectName = project.name;

        Matter.World.add(engineRef.current.world, circle);
      }, index * 100);
    });
  };

  useEffect(() => {
    const container = sceneRef.current?.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    setDimensions({ width, height });

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    engineRef.current = Engine.create();
    engineRef.current.world.gravity.y = 1;

    renderRef.current = Render.create({
      element: sceneRef.current,
      engine: engineRef.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
      },
    });

    const wallThickness = 5;
    const ground = Bodies.rectangle(
      width / 2,
      height - wallThickness,
      width,
      wallThickness * 2,
      {
        isStatic: true,
        render: {
          fillStyle: "rgba(255, 255, 255, 0.3)",
          strokeStyle: "rgba(255, 255, 255, 0.5)",
          lineWidth: 2,
        },
      },
    );
    const leftWall = Bodies.rectangle(
      wallThickness,
      height / 2,
      wallThickness * 2,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: "rgba(255, 255, 255, 0.3)",
          strokeStyle: "rgba(255, 255, 255, 0.5)",
          lineWidth: 2,
        },
      },
    );
    const rightWall = Bodies.rectangle(
      width - wallThickness,
      height / 2,
      wallThickness * 2,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: "rgba(255, 255, 255, 0.3)",
          strokeStyle: "rgba(255, 255, 255, 0.5)",
          lineWidth: 2,
        },
      },
    );

    World.add(engineRef.current.world, [ground, leftWall, rightWall]);

    const handleCanvasClick = (event) => {
      const mousePosition = {
        x: event.offsetX,
        y: event.offsetY,
      };

      const bodies = Matter.Composite.allBodies(engineRef.current.world);
      bodies.forEach((body) => {
        if (
          body.projectUrl &&
          Matter.Bounds.contains(body.bounds, mousePosition)
        ) {
          const distance = Math.sqrt(
            Math.pow(mousePosition.x - body.position.x, 2) +
              Math.pow(mousePosition.y - body.position.y, 2),
          );
          if (distance <= body.circleRadius) {
            window.open(body.projectUrl, "_blank");
          }
        }
      });
    };

    renderRef.current.canvas.addEventListener("click", handleCanvasClick);
    renderRef.current.canvas.style.cursor = "pointer";

    const runner = Runner.create();
    Runner.run(runner, engineRef.current);
    Render.run(renderRef.current);

    const handleScroll = () => {
      if (hasDropped || !engineRef.current) return;

      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        setHasDropped(true);
        setTimeout(() => dropAllCircles(), 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      renderRef.current.canvas.width = newWidth;
      renderRef.current.canvas.height = newHeight;
      renderRef.current.options.width = newWidth;
      renderRef.current.options.height = newHeight;

      Matter.Body.setPosition(ground, {
        x: newWidth / 2,
        y: newHeight - wallThickness,
      });
      Matter.Body.setPosition(leftWall, { x: wallThickness, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, {
        x: newWidth - wallThickness,
        y: newHeight / 2,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (renderRef.current && renderRef.current.canvas) {
        renderRef.current.canvas.removeEventListener(
          "click",
          handleCanvasClick,
        );
      }
      Render.stop(renderRef.current);
      Runner.stop(runner);
      World.clear(engineRef.current.world);
      Engine.clear(engineRef.current);
      renderRef.current.canvas.remove();
    };
  }, []); // CHANGED

  return (
    <div
      ref={sectionRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <button
        onClick={dropAllCircles}
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          padding: "12px 24px",
          background: "rgba(255, 255, 255, 0.2)",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "30px",
          color: "white",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          fontSize: "16px",
          fontWeight: "300",
        }}
      >
        View Projects
      </button>
      <div ref={sceneRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
