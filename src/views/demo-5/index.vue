<template>
  <div ref="wrapDemo5" style="width: 100%; height: 100%">
    <canvas ref="canvasDemo5" style="display: block; margin: auto" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { debounce } from 'lodash';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
// import url from '../../assets/images/ugly-cute.jpg'
const wrapDemo5 = ref<any>(null);
const canvasDemo5 = ref<any>(null);
const prng: any = alea();

onMounted(() => {
  const wrap = wrapDemo5.value;
  const canvas = canvasDemo5.value;
  let width = wrap.offsetWidth;
  let height = wrap.offsetHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const speed = 0;
  function init(): void {
    // const width = 1080;
    // const height = 1080;
    ctx.beginPath();
    // ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    const cols = 40;
    const rows = 40;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const gargx = (width - gridw) * 0.5;
    const gargy = (height - gridh) * 0.5;

    const noise2D = createNoise2D(prng);
    const frame = 1;

    const farmeArr: Array<any> = [];

    function draw(): void {
      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellw;
        const y = row * cellh;
        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const n = noise2D((x + frame) * 0.001, (y + 1) * 0.001);

        const angle = n * 0.1;
        const scale = n * x * 0.01;
        ctx.save();
        ctx.translate(x, y);
        ctx.translate(gargx, gargy);
        ctx.translate(cellw * 0.5, cellh * 0.5);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.lineCap = 'butt';
        ctx.lineWidth = Math.abs(scale);
        ctx.moveTo(-w * 0.5, 0);
        ctx.lineTo(h * 0.2, 0);
        ctx.stroke();
        ctx.restore();
      }
    }
    draw();
    // function animate(): void {
    //   ctx.clearRect(0, 0, width, height);
    //   requestAnimationFrame(animate);
    //   draw();
    // }
    // animate();
  }

  function resizeCanvas() {
    width = wrap.offsetWidth;
    height = wrap.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = '#f1f1f1f1';
    init();
  }
  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      resizeCanvas();
    }
  });
  resizeObserver.observe(wrapDemo5.value);
  window.addEventListener('resize', debounce(resizeCanvas, 600));
});
</script>
