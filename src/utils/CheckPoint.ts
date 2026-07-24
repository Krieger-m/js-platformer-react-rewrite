import { proportionalSize } from "./ProportionalSize";

export class CheckPoint {
  position: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  claimed: boolean;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, z: number) {
    this.position = {
      x,
      y,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(70);
    this.claimed = false;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.fillStyle = "#f1be32";
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  claim() {
    this.width = 0;
    this.height = 0;
    this.position.y = Infinity;
    this.claimed = true;
  }
}
