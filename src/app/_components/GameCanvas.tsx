"use client";
import { CheckPoint } from "@/utils/CheckPoint";
import { Platform } from "@/utils/Platform";
import { Player } from "@/utils/Player";
import { proportionalSize } from "@/utils/ProportionalSize";
import { useEffect, useRef, useState } from "react";
import { CheckPointOverlay } from "./CheckPointOverlay";

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [checkpointMessage, setCheckpointMessage] = useState("");
  const [checkpointVisible, setCheckpointVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const player = new Player(ctx, canvas);

    const platformPositions = [
      { x: 500, y: proportionalSize(450) },
      { x: 700, y: proportionalSize(400) },
      { x: 850, y: proportionalSize(350) },
      { x: 900, y: proportionalSize(350) },
      { x: 1050, y: proportionalSize(150) },
      { x: 2500, y: proportionalSize(450) },
      { x: 2900, y: proportionalSize(400) },
      { x: 3150, y: proportionalSize(350) },
      { x: 3900, y: proportionalSize(450) },
      { x: 4200, y: proportionalSize(400) },
      { x: 4400, y: proportionalSize(200) },
      { x: 4700, y: proportionalSize(150) },
    ];

    const platforms = platformPositions.map((p) => new Platform(ctx, p.x, p.y));

    const checkpointPositions = [
      { x: 1170, y: proportionalSize(80), z: 1 },
      { x: 2900, y: proportionalSize(330), z: 2 },
      { x: 4800, y: proportionalSize(80), z: 3 },
    ];

    const checkpoints = checkpointPositions.map(
      (c) => new CheckPoint(ctx, c.x, c.y, c.z),
    );

    let isCheckpointCollisionDetectionActive = true;

    const showCheckpointScreen = (msg: string) => {
      setCheckpointMessage(msg);
      setCheckpointVisible(true);

      // Auto-hide after 2 seconds (same as original)
      setTimeout(() => {
        setCheckpointVisible(false);
      }, 2000);
    };

    const keys = {
      right: false,
      left: false,
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") keys.right = true;
      if (e.key === "ArrowLeft") keys.left = true;
      if (e.key === "ArrowUp" || e.key === " ") player.velocity.y -= 8;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") keys.right = false;
      if (e.key === "ArrowLeft") keys.left = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Player movement
      if (keys.right && player.position.x < proportionalSize(400)) {
        player.velocity.x = 5;
      } else if (keys.left && player.position.x > proportionalSize(100)) {
        player.velocity.x = -5;
      } else {
        player.velocity.x = 0;

        if (keys.right) {
          platforms.forEach((p) => (p.position.x -= 5));
          checkpoints.forEach((c) => (c.position.x -= 5));
        } else if (keys.left) {
          platforms.forEach((p) => (p.position.x += 5));
          checkpoints.forEach((c) => (c.position.x += 5));
        }
      }

      // Draw platforms
      platforms.forEach((p) => p.draw());

      // Draw checkpoints
      checkpoints.forEach((c) => c.draw());

      // Update player
      player.update();

      // Platform collision detection
      platforms.forEach((platform) => {
        const rules = [
          player.position.y + player.height <= platform.position.y,
          player.position.y + player.height + player.velocity.y >=
            platform.position.y,
          player.position.x >= platform.position.x - player.width / 2,
          player.position.x <=
            platform.position.x + platform.width - player.width / 3,
        ];

        if (rules.every(Boolean)) {
          player.velocity.y = 0;
        }
      });
      // Checkpoint collision detection
      checkpoints.forEach((checkpoint, index) => {
        const checkpointDetectionRules = [
          player.position.x >= checkpoint.position.x,
          player.position.y >= checkpoint.position.y,
          player.position.y + player.height <=
            checkpoint.position.y + checkpoint.height,
          isCheckpointCollisionDetectionActive,
          player.position.x - player.width <=
            checkpoint.position.x - checkpoint.width + player.width * 0.9,
          index === 0 || checkpoints[index - 1].claimed === true,
        ];

        if (checkpointDetectionRules.every(Boolean)) {
          checkpoint.claim();

          // Final checkpoint reached
          if (index === checkpoints.length - 1) {
            isCheckpointCollisionDetectionActive = false;
            showCheckpointScreen(
              "wow, great! you reached the final checkpoint!",
            );
            player.velocity.x = 0;
            player.velocity.y = 0;
          } else {
            showCheckpointScreen("good job! you reached a checkpoint!");
          }
        }
      });
    };

    animate();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
  <div>
    {CheckPointOverlay(checkpointMessage, checkpointVisible)}
    <canvas id="canvas" ref={canvasRef}></canvas>
  </div>
);

};
