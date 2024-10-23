import { debounce } from "lodash";
function canvasResize(wight: number, height: number, wrap: any, canvas: any, draw: any): void {
  window.addEventListener(
    "resize",
    debounce(() => {
      wight = wrap.offsetWidth;
      height = wrap.offsetHeight;
      if (wight > 0) {
        canvas.width = wight;
        canvas.height = height;
        console.log(wight, height);
        draw();
      }
    }, 400)
  );
}
export {
  canvasResize
}
