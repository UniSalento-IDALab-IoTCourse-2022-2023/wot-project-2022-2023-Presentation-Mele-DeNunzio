import { Injectable } from '@angular/core';

@Injectable()
export class Timer {
  private startTime: number | null = null;
  private elapsedTime: number = 0;

  constructor() {}

  start() {
    this.startTime = Date.now();
    this.elapsedTime = 0;
  }

  stop() {
    if (this.startTime !== null) {
      this.elapsedTime = Date.now() - this.startTime;
      this.startTime = null;
    }
  }

  reset() {
    this.startTime = null;
    this.elapsedTime = 0;
  }

  getElapsedTime() {
    console.log(this.elapsedTime)
    return this.elapsedTime;
  }
}