class CanvasFunctions {
   constructor(element) {
      /** @type {HTMLCanvasElement} */
      this.canvasElement = element;
      /** @type {CanvasRenderingContext2D} */
      this.ctx = element.getContext('2d');

      this.fix_dpi();
   }

   fix_dpi() {
      const dpi = window.devicePixelRatio;
      const style = {
         height: () =>
            getComputedStyle(this.canvasElement)
               .getPropertyValue('height')
               .slice(0, -2),
         width: () =>
            getComputedStyle(this.canvasElement)
               .getPropertyValue('width')
               .slice(0, -2)
      };

      this.canvasElement.setAttribute('width', style.width() * dpi);
      this.canvasElement.setAttribute('height', style.height() * dpi);
   }

   setColor(color) {
      this.ctx.fillStyle = color;
   }

   drawRect(x, y, w, h) {
      this.ctx.fillRect(x, y, w, h);
   }
}

export { CanvasFunctions };
