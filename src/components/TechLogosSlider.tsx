import { Box } from "@mui/material";

type TechLogosSliderProps = {
  isRTL: boolean;
};

const LOGOS: { alt: string; src: string }[] = [
  { alt: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { alt: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { alt: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { alt: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { alt: "Flutter", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { alt: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { alt: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { alt: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { alt: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { alt: "Nuxt", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg" },
  { alt: "Vue", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
];

const TechLogosSlider = ({ isRTL }: TechLogosSliderProps) => {
  const sorted = [...LOGOS].sort((a, b) => a.alt.localeCompare(b.alt, 'en', { sensitivity: 'base' }));
  // Show TypeScript only in the second loop
  const firstPass = sorted.filter((l) => l.alt !== 'TypeScript');
  const items = [...firstPass, ...sorted];
  return (
    <Box component="section" className="section-spacing" sx={{ py: 4 }}>
      <div className="container">
        <div className="logos-marquee" data-rtl={isRTL ? "true" : "false"}>
          <div className="logos-track">
            {items.map((item, idx) => (
              <div className="logo-item" key={`${item.alt}-${idx}`}>
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TechLogosSlider;
