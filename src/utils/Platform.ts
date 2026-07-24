import { proportionalSize } from "./ProportionalSize";

export class Platform {
  position: {
    x: number;
    y: number;
  };
  height: number;
  width: number;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.position = {
      x,
      y,
    };
    this.width = 200;
    this.height = proportionalSize(40);
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "#B9CBE5";
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
