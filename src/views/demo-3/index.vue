<template>
  <div ref="wrapDemo3" style="width: 100%; height: 100%; overflow: hidden">
    <canvas ref="canvasDemo3" style="background: #f1f1f1" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
import { rangeValue, rangeVal } from '@/utils/rangeValue.ts';
const wrapDemo3 = ref<any>(null);
const canvasDemo3 = ref<any>(null);
onMounted(() => {
  const wrap = wrapDemo3.value;
  const canvas = canvasDemo3.value;
  let wight = wrap.offsetWidth;
  let height = wrap.offsetHeight;
  canvas.width = wight;
  canvas.height = height;

  const speed: number = 0.5;

  class Vector {
    constructor(
      public x: number,
      public y: number,
    ) {
      this.x = x;
      this.y = y;
    }
  }

  class Agent {
    vel: Vector;
    constructor(
      public x: number,
      public y: number,
      public radius: number,
    ) {
      this.x = x;
      this.y = y;
      this.vel = new Vector(rangeVal(speed), rangeVal(speed));
      this.radius = radius;
    }
    draw(ctx: any) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    update() {
      this.x += this.vel.x;
      this.y += this.vel.y;
      if (this.x < 0 || this.x > wight) {
        this.vel.x *= -1;
      }
      if (this.y < 0 || this.y > height) {
        this.vel.y *= -1;
      }
    }
  }

  function getDistance(p1: any, p2: any): number {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  function init() {
    const num: number = height * wight * 0.00025;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, wight, height);
    const agents: Array<any> = [];
    for (let i = 0; i < num; i++) {
      const x = Math.random() * wight;
      const y = Math.random() * height;
      agents.push(new Agent(x, y, rangeValue(10)));
      // agents[i].draw(ctx);
    }

    function wiring() {
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          if (getDistance(agents[i], agents[j]) < 50) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.moveTo(agents[i].x, agents[i].y);
            ctx.lineTo(agents[j].x, agents[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
        agents[i].draw(ctx);
        agents[i].update();
      }
    }

    (function animation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      requestAnimationFrame(animation);
      wiring();
    })();
  }

  init();

  window.addEventListener(
    'resize',
    debounce(() => {
      wight = wrap.offsetWidth;
      height = wrap.offsetHeight;
      if (wight > 0) {
        canvas.width = wight;
        canvas.height = height;
        init();
      }
    }, 600),
  );
});
</script>
