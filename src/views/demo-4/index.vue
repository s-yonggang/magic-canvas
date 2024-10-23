<template>
  <div ref="wrapDemo4" style="width: 100%; height: 100%; background: #000000">
    <span style="color: #fff; position: absolute">有彩蛋!(*^_^*){{ message }}</span>
    <canvas ref="canvasDemo4" style="display: block; margin: auto" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { debounce } from "lodash";
const message = ref("");
const wrapDemo4 = ref<any>(null);
const canvasDemo4 = ref<any>(null);
onMounted(() => {
  const wrap = wrapDemo4.value;
  const canvas = canvasDemo4.value;
  let wight = wrap.offsetWidth;
  let height = wrap.offsetHeight;
  let ctx = canvas.getContext("2d", { willReadFrequently: true });
  const typeCanvas: any = document.createElement("canvas");
  const typeCtx: any = typeCanvas.getContext("2d", { willReadFrequently: true });

  let cell = 10; // 自定义像素
  let cols: number;
  let rows: number;
  let numCells: number;
  let ctxWH: number;
  let typeCtxWH: number;

  function sizeSet() {
    wight = wrap.offsetWidth;
    height = wrap.offsetHeight;

    cols = Math.floor(wight / cell);
    rows = Math.floor(height / cell);
    numCells = cols * rows;
    if (height >= wight) {
      ctxWH = wight;
      typeCtxWH = cols;
    } else {
      ctxWH = height;
      typeCtxWH = rows;
    }
    canvas.width = ctxWH;
    canvas.height = ctxWH;
    typeCanvas.white = typeCtxWH;
    typeCanvas.height = typeCtxWH;
  }

  let text: string = "S";
  let fontSize: number = 800;
  const family: string = "serif";

  function init(): void {
    sizeSet();
    ctx.reset();
    typeCtx.reset();
    ctx.beginPath();
    typeCtx.beginPath();
    ctx.clearRect(0, 0, ctxWH, ctxWH);
    typeCtx.clearRect(0, 0, ctxWH, ctxWH);

    // ctx.scale(0.5, 0.5);
    typeCtx.fillStyle = "black";
    typeCtx.fillRect(0, 0, typeCtxWH, typeCtxWH);
    fontSize = typeCtxWH;
    typeCtx.fillStyle = "white";
    typeCtx.font = `900 ${fontSize}px ${family}`;
    // typeCtx.textBaseline = "top";

    // measureText:文本尺寸信息
    const metrics = typeCtx.measureText(text);

    // 利用包围盒 + translate 居中
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const tx = (typeCtxWH - mw) * 0.5 - mx;
    const ty = (typeCtxWH - mh) * 0.5 - my;
    typeCtx.save();
    typeCtx.translate(tx, ty);
    // typeCtx.rect(mx, my, mw, mh);
    typeCtx.stroke();
    typeCtx.fillText(text, 0, 0);
    typeCtx.restore();

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctxWH, ctxWH);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    const typeData = typeCtx.getImageData(0, 0, typeCtxWH, typeCtxWH).data;
    for (let i = 0; i < numCells; i++) {
      const col = i % typeCtxWH; // 这里为什么取余?
      const row = Math.floor(i / typeCtxWH);

      // const col = Math.floor(i / typeCtxWH);
      // const row = Math.floor(i / typeCtxWH);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];

      ctx.fillStyle = `white`;
      ctx.save();

      // 正方形
      // ctx.translate(x, y);
      // ctx.fillRect(0, 0, cell, cell);

      // 自定义符号/图形
      if (Math.random() < 0.2 && r > 50) {
        ctx.font = `${cell * 3}px ${family}`;
      } else {
        ctx.font = `${cell}px ${family}`;
      }
      ctx.translate(x, y);
      ctx.translate(cell, cell + 10);
      ctx.fillText(getGlyph(r), 0, 0);

      //圆
      // ctx.translate(x - cell * 0.5, y - cell * 0.5);
      // ctx.arc(0, 0, cell * 0.5, 0, Math.PI * 2);
      // ctx.fill();

      ctx.restore();
    }
    // ctx.drawImage(typeCanvas, 0, 0);
  }

  init();

  function getGlyph(v: any): string {
    if (v < 50) return "";
    if (v < 70) return "magic canvas";
    if (v < 10) return "+";
    if (v < 120) return "*";
    const rdm = Math.floor(Math.random() * 10);
    const str = "*-+\=^'❀~./".split("")[rdm];
    // const str = "♩♪♫♬♭❀♮♯°ø".split("")[rdm];
    return str;
  }

  document.addEventListener("keyup", onkeyup);
  function onkeyup(e: KeyboardEvent) {
    text = e.key.toUpperCase();
    init();
    message.value = `----这都被你发现了!`;
  }

  function resizeCanvas() {
    init();
  }

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      resizeCanvas();
    }
  });
  resizeObserver.observe(wrapDemo4.value);
  window.addEventListener("resize", debounce(resizeCanvas, 600));
});
</script>
