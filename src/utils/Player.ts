import { proportionalSize } from "./ProportionalSize";

const gravity = 0.5;

export class Player {
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
  ctx : CanvasRenderingContext2D;
  canvas : HTMLCanvasElement;

  constructor(ctx : CanvasRenderingContext2D,canvas : HTMLCanvasElement) {
    this.position = {
      x: proportionalSize(10),
      y: proportionalSize(400),
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = proportionalSize(40);
    this.height = proportionalSize(40);
    this.ctx = ctx
    this.canvas = canvas
  }
  draw() {
    this.ctx.fillStyle = "#50BF9A";
    this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= this.canvas.height) {
      if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y = gravity;
      }
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }

    if (this.position.x < this.width) {
      this.position.x = this.width;
    }

    if (this.position.x >= this.canvas.width - 2 * this.width) {
      this.position.x = this.canvas.width - 2 * this.width;
    }
  }
}