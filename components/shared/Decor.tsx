// Авторские декоративные SVG: берёзовые листья, ветка, солнце, облако, волны.
// Все фигурки aria-hidden — они только обрамляют контент.

type SvgProps = React.SVGProps<SVGSVGElement>;

export function BirchLeaf({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 48 64" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M24 4c10 8 18 19 18 31 0 13-8 23-18 25C14 58 6 48 6 35 6 23 14 12 24 4Z"
        fill="currentColor"
      />
      <path d="M24 10v50M24 26l-8-6M24 34l9-7M24 42l-9-6M24 50l8-5" stroke="#faf8f1" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BirchBranch({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 220 120" fill="none" aria-hidden="true" className={className} {...props}>
      <path d="M4 18c40 6 80 22 112 46s62 38 100 42" stroke="#6f7b70" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M58 32c-4 14-2 26 6 36M120 68c8 10 10 22 6 34M168 92c-2-12 2-24 12-32" stroke="#6f7b70" strokeWidth="1.8" strokeLinecap="round" />
      {[
        { x: 60, y: 70, r: 12, c: "#a8be9e" },
        { x: 30, y: 26, r: -40, c: "#8fae86" },
        { x: 92, y: 40, r: -20, c: "#355846" },
        { x: 126, y: 102, r: 18, c: "#a8be9e" },
        { x: 150, y: 76, r: -30, c: "#8fae86" },
        { x: 182, y: 58, r: 40, c: "#a8be9e" },
        { x: 204, y: 100, r: -10, c: "#355846" },
      ].map((l, i) => (
        <path
          key={i}
          d="M0-12c5 4 9 9 9 15 0 6-4 11-9 12-5-1-9-6-9-12 0-6 4-11 9-15Z"
          fill={l.c}
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
        />
      ))}
    </svg>
  );
}

export function Sun({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" className={className} {...props}>
      <circle cx="40" cy="40" r="17" fill="#f3d986" />
      <circle cx="40" cy="40" r="17" stroke="#e3c35f" strokeWidth="1.5" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * Math.PI * 2) / 10;
        const r1 = 24;
        const r2 = i % 2 ? 30 : 34;
        return (
          <line
            key={i}
            x1={(40 + Math.cos(a) * r1).toFixed(2)}
            y1={(40 + Math.sin(a) * r1).toFixed(2)}
            x2={(40 + Math.cos(a) * r2).toFixed(2)}
            y2={(40 + Math.sin(a) * r2).toFixed(2)}
            stroke="#e9c766"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

export function Cloud({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden="true" className={className} {...props}>
      <path
        d="M24 52h70c12 0 20-8 20-18 0-11-9-19-20-18-3-9-12-15-22-14-9 1-15 6-18 13-3-2-7-3-11-2-8 2-12 8-12 15-9 0-15 6-15 13 0 6 4 11 8 11Z"
        fill="#ffffff"
        stroke="#dfe8d9"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Ствол берёзы — вертикальная полоса с тёмными «чечевичками» */
export function BirchTrunk({ className, ...props }: SvgProps) {
  return (
    <svg viewBox="0 0 24 200" fill="none" aria-hidden="true" preserveAspectRatio="none" className={className} {...props}>
      <rect x="2" y="0" width="20" height="200" rx="10" fill="#ffffff" stroke="#dcdcd2" strokeWidth="1.5" />
      {[18, 46, 70, 104, 132, 166, 186].map((y, i) => (
        <path key={y} d={`M${i % 2 ? 10 : 4} ${y}h${i % 3 ? 8 : 12}`} stroke="#3b3f3a" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Волнистый переход между секциями. fill — цвет следующей секции. */
export function Wave({ className, fill = "currentColor", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d="M0 40c120-22 260-34 420-20s300 36 460 30 300-34 420-38c60-2 110 4 140 10v42H0Z" fill={fill} />
    </svg>
  );
}

/** Знак садика для шапки: лист берёзы в круге */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className={className}>
      <circle cx="22" cy="22" r="21" fill="#eef3ea" stroke="#a8be9e" strokeWidth="1.5" />
      <rect x="20.5" y="16" width="3" height="20" rx="1.5" fill="#ffffff" stroke="#6f7b70" strokeWidth="0.8" />
      <path d="M21 22h2.2M21.5 28h2" stroke="#3b3f3a" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M22 7c5 4 8 8 8 12.5S26.5 26 22 27c-4.5-1-8-3-8-7.5S17 11 22 7Z" fill="#355846" />
      <path d="M22 10v15" stroke="#eef3ea" strokeOpacity=".6" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="31.5" cy="12.5" r="3.2" fill="#f3d986" />
    </svg>
  );
}
