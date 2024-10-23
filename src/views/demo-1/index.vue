<template>
  <div ref="wrapDemo1" style="width: 100%; height: 100%; overflow: hidden">
    <canvas ref="canvasDemo1" style="background: #f1f1f1" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { throttle, debounce } from "lodash";
// import { canvasResize } from "@/utils/canvasResize.ts";
const wrapDemo1 = ref<any>(null);
const canvasDemo1 = ref<any>(null);
onMounted(() => {
  const wrap = wrapDemo1.value;
  const canvas = canvasDemo1.value;
  let wight = wrap.offsetWidth;
  let height = wrap.offsetHeight;
  canvas.width = wight;
  canvas.height = height;

  function draw() {
    let ctx = canvas.getContext("2d");
    let startPos = wight / 2;
    let lop = 14;
    for (let i = 0; i < lop; i++) {
      for (let j = 0; j < lop; j++) {
        let w = 40;
        let h = 40;
        let gap = 10;
        let x = startPos - (lop * (w + gap)) / 2 + (w + gap) * i;
        let y = 60 + (h + gap) * j;
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.lineWidth = 6;
        ctx.rect(x, y, w, h);
        ctx.stroke();
        ctx.closePath();
        if (Math.random() > 0.5) {
          ctx.beginPath();
          ctx.rect(x + 5, y + 5, w - 10, h - 10);
          ctx.stroke();
          // ctx.fill();
          ctx.closePath();
        }
      }
    }
    ctx.closePath();
  }
  draw();
  // canvasResize(wight, height, wrap, canvas, draw);
  window.addEventListener(
    "resize",
    debounce(() => {
      wight = wrap.offsetWidth;
      height = wrap.offsetHeight;
      if (wight > 0) {
        canvas.width = wight;
        canvas.height = height;
        draw();
      }
    }, 600)
  );
});
</script>
