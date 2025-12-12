import { Box, Typography, Chip, Stack, Card, CardContent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useTranslation } from "react-i18next";

type TechDetailPageProps = { isRTL: boolean };

type TechInfo = {
  title: string;
  logo?: string;
  blurb: string;
  snippetTitle?: string;
  code: string;
};

const TECH: Record<string, TechInfo> = {
  html: {
    title: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    blurb: "The foundation of the web — semantic structure for content and accessibility.",
    snippetTitle: "Semantic markup",
    code: `<main>\n  <article>\n    <h1>RhineFurat</h1>\n    <p>Hire trusted developers, fast.</p>\n  </article>\n</main>`,
  },
  css: {
    title: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    blurb: "Presentation language that brings responsive, accessible designs to life.",
    snippetTitle: "Responsive card",
    code: `.card{\n  padding:1rem;\n  border-radius:12px;\n  background:linear-gradient(140deg,#1d3557,#457b9d);\n  color:#f1faee;\n}`,
  },
  javascript: {
    title: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    blurb: "Ubiquitous language of interactive web and cross-platform apps.",
    snippetTitle: "Pure JS greeting",
    code: `function greet(name){\n  return \`Hello, ${name}!\`;\n}\nconsole.log(greet('World'));`,
  },
  csharp: {
    title: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    blurb: "Modern, type-safe language for backend, desktop, and cloud.",
    code: `using System;\nclass Program{\n  static void Main(){ Console.WriteLine("Hello, RhineFurat"); }\n}`,
  },
  php: {
    title: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    blurb: "Fast to build web backends and APIs with rich ecosystem.",
    code: `<?php echo "Hello, RhineFurat"; ?>`,
  },
  cpp: {
    title: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    blurb: "High-performance systems and compute-heavy applications.",
    code: `#include <iostream>\nint main(){ std::cout << "Hello, RhineFurat"; }`,
  },
  python: {
    title: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    blurb: "Readable, batteries-included language for data and backends.",
    code: `def greet(name: str) -> str:\n    return f"Hello, {name}"\nprint(greet("RhineFurat"))`,
  },
  java: {
    title: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    blurb: "Enterprise-grade language powering large-scale systems.",
    code: `public class Main {\n  public static void main(String[] args){\n    System.out.println("Hello, RhineFurat");\n  }\n}`,
  },
  nodejs: {
    title: "NodeJS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    blurb: "Event-driven runtime for building fast network services.",
    code: `console.log('Hello, RhineFurat from NodeJS');`,
  },
  mysql: {
    title: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    blurb: "Trusted relational database for transactional workloads.",
    code: `SELECT id, name FROM developers WHERE active = 1 ORDER BY name;`,
  },
  flutter: {
    title: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
    blurb: "Cross-platform UI toolkit powered by Dart.",
    code: `import 'package:flutter/material.dart';\nvoid main() => runApp(const MaterialApp(home: Text('Hello RhineFurat')));`,
  },
  react: {
    title: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    blurb: "Component-driven library for building interactive UIs.",
    code: `export default function Hello(){\n  return <h1>Hello RhineFurat</h1>;\n}`,
  },
  laravel: {
    title: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    blurb: "Elegant PHP framework for rapid backend development.",
    code: `Route::get('/hello', function(){\n  return 'Hello RhineFurat';\n});`,
  },
  kotlin: {
    title: "Kotlin",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
    blurb: "Modern language for Android and server development.",
    code: `fun main(){ println("Hello, RhineFurat") }`,
  },
};

const TechDetailPage = ({ isRTL }: TechDetailPageProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let tech = slug ? TECH[slug.toLowerCase()] : undefined;
  if (slug && ["html", "css", "javascript"].includes(slug.toLowerCase())) {
    const data = t(`tech.detail.${slug.toLowerCase()}`, { returnObjects: true }) as Partial<TechInfo> | string;
    if (data && typeof data === 'object' && (data as Partial<TechInfo>).title) {
      tech = {
        title: (data as Partial<TechInfo>).title || tech?.title || slug,
        logo: tech?.logo,
        blurb: (data as Partial<TechInfo>).blurb || tech?.blurb || "",
        snippetTitle: (data as Partial<TechInfo>).snippetTitle || tech?.snippetTitle,
        code: (data as Partial<TechInfo>).code || tech?.code || "",
      };
    }
  }

  if (!tech) {
    return (
      <Box className="section-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container">
          <Typography variant="h4" sx={{ mb: 2, textAlign: isRTL ? 'right' : 'left' }}>
            Not found
          </Typography>
          <Chip label="Back" color="primary" onClick={() => navigate(-1)} />
        </div>
      </Box>
    );
  }

  return (
    <Box className="section-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <Reveal>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            {tech.logo && (
              <Box component="img" src={tech.logo} alt={`${tech.title} logo`} sx={{ height: 44 }} />
            )}
            <Typography variant="h3" sx={{ textAlign: isRTL ? 'right' : 'left' }}>{tech.title}</Typography>
          </Stack>
        </Reveal>
        <Reveal delayMs={80}>
          <Typography variant="body1" sx={{ maxWidth: 900, mb: 3, textAlign: isRTL ? 'right' : 'left' }}>
            {tech.blurb}
          </Typography>
        </Reveal>
        <Reveal delayMs={120}>
          <Card className="border-0 shadow-sm">
            <CardContent>
              {tech.snippetTitle && (
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {tech.snippetTitle}
                </Typography>
              )}
              <Box
                component="pre"
                sx={{
                  p: 2,
                  m: 0,
                  overflowX: 'auto',
                  borderRadius: 1.5,
                  bgcolor: (theme) => theme.palette.action.hover,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: 14,
                }}
              >
                <code>{tech.code}</code>
              </Box>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Box>
  );
};

export default TechDetailPage;
