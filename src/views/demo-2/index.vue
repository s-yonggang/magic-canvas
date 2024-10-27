<template>
  <div
    ref="wrapDemo2"
    style="width: 100%; height: 100%; background: #f1f1f1; overflow: hidden"
  >
    <canvas style="display: block; margin: 0 auto" ref="canvasDemo2" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { rangeValue } from '@/utils/rangeValue.ts'
const wrapDemo2 = ref<any>(null)
const canvasDemo2 = ref<any>(null)
onMounted(() => {
  const wrap = wrapDemo2.value
  const canvas = canvasDemo2.value
  // let wight = wrap.offsetWidth;
  // let height = wrap.offsetHeight;
  const width = 800
  const height = 800
  canvas.width = width
  canvas.height = height

  function degToRad(deg: number): number {
    return (deg * Math.PI) / 180
  }

  function draw() {
    let ctx = canvas.getContext('2d')

    let x = width * 0.5
    let y = height * 0.5
    let w = width * 0.01
    let h = height * 0.1

    const num = 40
    const radius = width / 3

    for (let i = 0; i < num; i++) {
      let step = degToRad(360 / num)
      let angle = step * i
      const nx = x + radius * Math.sin(angle)
      const ny = y + radius * Math.cos(angle)
      ctx.save()
      ctx.translate(nx, ny)
      ctx.rotate(-angle)
      ctx.scale(Math.random() * 3 + 1, 1.0)

      ctx.beginPath()
      ctx.rect(-w / 2, -h / 2, w, rangeValue(h, 5, -5))
      ctx.fill()
      ctx.restore()

      ctx.save()
      ctx.translate(x - 0, y)
      ctx.rotate(-angle)
      ctx.lineWidth = rangeValue(10, 5, -5)

      ctx.beginPath()
      ctx.arc(0, 0, rangeValue(radius, -radius * 50), step * -0.4, step * 10)
      ctx.stroke()
      ctx.restore()
    }
  }
  draw()
})
</script>
