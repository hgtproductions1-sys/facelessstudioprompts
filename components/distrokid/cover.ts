export const coverStyles = [
  { name: 'Obsidian Vinyl', background: '#10191f', accent: '#70e5cb', ink: '#f4fffb' },
  { name: 'Cobalt Frequency', background: '#17295b', accent: '#8ee4ff', ink: '#f1f8ff' },
  { name: 'Amber Analog', background: '#4c2720', accent: '#fab56a', ink: '#fff1de' },
  { name: 'Emerald Resonance', background: '#10352f', accent: '#b8e98e', ink: '#f1f9d8' },
  { name: 'Crimson Pulse', background: '#461d32', accent: '#ff96b2', ink: '#fff0f4' },
  { name: 'Ivory Monolith', background: '#ecdfbf', accent: '#28636a', ink: '#172c31' },
] as const;

export type CoverSettings = {
  style: number;
  background: string;
  accent: string;
  ink: string;
  title: string;
  artist: string;
  artwork?: HTMLImageElement;
  waveform: number[];
};

const extent = 1000;

function ellipse(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, rotation = 0) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
}

function drawMotif(ctx: CanvasRenderingContext2D, style: number, accent: string) {
  ctx.save();
  ctx.fillStyle = accent;
  ctx.strokeStyle = accent;
  switch (style) {
    case 0: {
      for (let r = 70; r < 390; r += 11) {
        ctx.globalAlpha = r % 3 ? 0.22 : 0.38;
        ctx.lineWidth = 1.7;
        ellipse(ctx, 660, 510, r, r);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.93;
      ellipse(ctx, 660, 510, 72, 72);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      ellipse(ctx, 660, 510, 11, 11);
      ctx.fill();
      break;
    }
    case 1: {
      ctx.lineWidth = 3;
      for (let row = 0; row < 25; row++) {
        ctx.globalAlpha = 0.11 + row * 0.016;
        ctx.beginPath();
        for (let x = 0; x <= extent; x += 8) {
          const y = 270 + row * 15 + Math.sin(x / 115 + row / 6) * (28 + row * 2) + x * 0.16;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      break;
    }
    case 2: {
      ctx.translate(580, 540);
      ctx.rotate(-0.3);
      for (let x = -310; x < 310; x += 84) {
        ctx.globalAlpha = 0.32 + (x + 310) / 1600;
        ctx.fillRect(x, -210, 66, 420);
        ctx.globalAlpha = 0.89;
        ctx.fillRect(x, 190, 66, 5);
      }
      ctx.globalAlpha = 0.7;
      ctx.strokeRect(-365, -253, 745, 506);
      break;
    }
    case 3: {
      for (let i = 0; i < 23; i++) {
        ctx.lineWidth = 1.9;
        ctx.globalAlpha = 0.28 + i * 0.024;
        ellipse(ctx, 540, 530, 340, 115 + i * 4, i * Math.PI / 24);
        ctx.stroke();
      }
      break;
    }
    case 4: {
      for (let i = 0; i < 14; i++) {
        const x = 210 + i * 48;
        const h = 40 + 440 * Math.pow(Math.sin((i + 0.3) * Math.PI / 14), 2);
        ctx.globalAlpha = 0.23 + i * 0.036;
        ctx.fillRect(x, 525 - h / 2, 22, h);
        ctx.fillRect(x, 540 + h / 2, 22, 7);
      }
      break;
    }
    default: {
      ctx.globalAlpha = 0.85;
      ctx.beginPath();
      ctx.moveTo(500, 175);
      ctx.lineTo(850, 695);
      ctx.lineTo(240, 695);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 0.36;
      ctx.lineWidth = 2;
      ellipse(ctx, 550, 470, 350, 330);
      ctx.stroke();
      break;
    }
  }
  ctx.restore();
}

function titleLines(ctx: CanvasRenderingContext2D, title: string) {
  const words = title.trim().split(/\s+/);
  for (let fontSize = 111; fontSize >= 38; fontSize -= 4) {
    ctx.font = '700 ' + fontSize + 'px Georgia, serif';
    const lines = [''];
    for (const word of words) {
      const candidate = (lines.at(-1) + ' ' + word).trim();
      if (lines.at(-1) && ctx.measureText(candidate).width > 845) lines.push(word);
      else lines[lines.length - 1] = candidate;
    }
    if (lines.length <= 3 && lines.every(line => ctx.measureText(line).width <= 845)) return { lines, fontSize };
  }
  ctx.font = '700 38px Georgia, serif';
  return { lines: [title], fontSize: 38 };
}

export function drawCover(canvas: HTMLCanvasElement, settings: CoverSettings) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('This browser could not open the cover canvas.');
  const scale = canvas.width / extent;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.fillStyle = settings.background;
  ctx.fillRect(0, 0, extent, extent);

  if (settings.artwork) {
    const image = settings.artwork;
    const side = Math.min(image.naturalWidth, image.naturalHeight);
    ctx.drawImage(image, (image.naturalWidth - side) / 2, (image.naturalHeight - side) / 2, side, side, 0, 0, extent, extent);
    const shade = ctx.createLinearGradient(0, 0, 0, extent);
    shade.addColorStop(0, settings.background + 'bd');
    shade.addColorStop(0.45, settings.background + '1b');
    shade.addColorStop(1, settings.background + 'f2');
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, extent, extent);
  } else {
    const wash = ctx.createRadialGradient(640, 420, 10, 640, 460, 665);
    wash.addColorStop(0, settings.accent + '3b');
    wash.addColorStop(1, settings.background + '00');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, extent, extent);
    drawMotif(ctx, settings.style, settings.accent);
  }

  ctx.globalAlpha = 1;
  ctx.strokeStyle = settings.accent + '75';
  ctx.lineWidth = 2;
  ctx.strokeRect(46, 46, 908, 908);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = settings.ink;
  ctx.font = '600 34px Arial, sans-serif';
  if (settings.artist.trim()) ctx.fillText(settings.artist.trim(), 78, 119, 845);
  const { lines, fontSize } = titleLines(ctx, settings.title.trim() || 'Untitled');
  const titleBottom = settings.waveform.length ? 823 : 887;
  lines.forEach((line, i) => ctx.fillText(line, 74, titleBottom - (lines.length - 1 - i) * fontSize * 0.95, 845));

  if (settings.waveform.length) {
    const width = 846 / settings.waveform.length;
    ctx.fillStyle = settings.accent;
    settings.waveform.forEach((peak, i) => {
      const height = Math.max(2, Math.min(1, Math.abs(peak)) * 65);
      ctx.fillRect(77 + i * width, 888 - height / 2, Math.max(2, width * 0.5), height);
    });
  }
}
