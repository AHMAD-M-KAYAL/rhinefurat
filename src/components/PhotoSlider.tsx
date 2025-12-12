import { useEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Reveal from "./Reveal";

type PhotoSliderProps = {
  isRTL: boolean;
};

const IMAGES: string[] = [
  // Programming / technology themed images
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
];

const PhotoSlider = ({ isRTL }: PhotoSliderProps) => {
  const [index, setIndex] = useState(0);
  const max = IMAGES.length;

  const next = () => setIndex((i) => (i + 1) % max);
  const prev = () => setIndex((i) => (i - 1 + max) % max);

  // Crossfade state
  const [frontSrc, setFrontSrc] = useState(IMAGES[0]);
  const [backSrc, setBackSrc] = useState(IMAGES[0]);
  const [frontOpacity, setFrontOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % max);
    }, 5000);
    return () => clearInterval(id);
  }, [max]);

  const current = useMemo(() => IMAGES[index], [index]);

  // When index changes, crossfade from backSrc -> frontSrc
  useEffect(() => {
    setBackSrc(frontSrc);
    setFrontSrc(current);
    setFrontOpacity(0);
    // trigger next frame to animate opacity
    rafRef.current = window.requestAnimationFrame(() => {
      setFrontOpacity(1);
    });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current]);

  return (
    <Box component="section" className="section-spacing">
      <div className="container">
        <Reveal>
          <Box
            sx={{
              position: "relative",
              height: { xs: 220, md: 360 },
              borderRadius: 3,
              overflow: "hidden",
              // base background
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            {/* Back layer (previous image) */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(140deg, rgba(29,53,87,0.15), rgba(69,123,157,0.25)), url(${backSrc}) center/cover`,
                transition: "opacity 900ms ease-in-out",
                opacity: 1,
              }}
            />
            {/* Front layer (next image) */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(140deg, rgba(29,53,87,0.18), rgba(69,123,157,0.28)), url(${frontSrc}) center/cover`,
                transition: "opacity 900ms ease-in-out",
                opacity: frontOpacity,
              }}
            />
            <Stack
              direction="row"
              spacing={1}
              sx={{
                position: "absolute",
                bottom: 12,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <IconButton
                aria-label="Previous"
                onClick={isRTL ? next : prev}
                color="primary"
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.5)",
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label="Next"
                onClick={isRTL ? prev : next}
                color="primary"
                sx={{
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(0,0,0,0.5)",
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Box>
        </Reveal>
      </div>
    </Box>
  );
};

export default PhotoSlider;
