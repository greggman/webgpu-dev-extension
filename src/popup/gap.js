const ctx = document.createElement('canvas').getContext('2d', {willReadFrequently: true});

const cache = new Map();

function isColumnEmpty(pixels, width, height, x) {
  for (let y = 0; y < height; ++y) {
    const offset = y * width + x;
    if (pixels[offset]) {
      return false;
    }
  }
  return true;
}

function isRowEmpty(pixels, width, y) {
  for (let x = 0; x < width; ++x) {
    const offset = y * width + x;
    if (pixels[offset]) {
      return false;
    }
  }
  return true;
}

export function getGap(element) {
  const style = window.getComputedStyle(element);
  const left =
      style.textAlign === 'left' || 
      (style.textAlign === 'start' && style.direction === 'ltr') ||
      (style.textAlign === 'end' && style.direction === 'rtl');
  const right =
      style.textAlign === 'right' ||
      (style.textAlign === 'start' && style.direction === 'rtl') ||
      (style.textAlign === 'end' && style.direction === 'ltr');
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const text = element.textContent;
  const width = 128;
  const extra = 32;
  const height = element.clientHeight + extra * 2;
  const char = right
      ? text.substring(text.length - 1, text.length)
      : text.substring(0, 1);
  const key = `${font} ${window.devicePixelRatio} ${height} ${style.textAlign} + ${char}`;
  let gap = cache.get(key);
  if (gap === undefined) {
    gap = 0;
    if (height && (left || right)) {
      const dpr = window.devicePixelRatio;
      ctx.canvas.width = width * dpr;
      ctx.canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      ctx.font = font;
      ctx.textAlign = right ? 'right' : 'left';

      ctx.fillText(text, right ? width - 1 : 0, height + extra);

      const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
      const pixels = new Uint32Array(imgData.data.buffer);

      const delta = right ? -1 : 1;
      const start = right ? imgData.width - 1 : 0;
      const end = right ? -1 : imgData.width;

      let x = start;
      for (; x !== end; x += delta) {
        if (!isColumnEmpty(pixels, imgData.width, imgData.height, x)) {
          break;
        }
      }

      gap = (start - x) * delta / dpr;
    }
    cache.set(key, gap);
  }

  const margin = `${gap}px`;
  return {
    gap,
    styles: [
      ['marginLeft', left ? margin : '0'],
      ['marginRight', right ? margin : '0'],
    ],
  };
}

export function removeGap(element) {
  const {styles} = getGap(element);
  for (const [prop, value] of styles) {
    element.style[prop] = value;
  }
}