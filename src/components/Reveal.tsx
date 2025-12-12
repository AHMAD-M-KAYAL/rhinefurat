import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealProps = {
  children: React.ReactNode;
  as?: React.ElementType;
  delayMs?: number;
  durationMs?: number;
  distancePx?: number;
  direction?: Direction;
};

const Reveal = ({
  children,
  as = 'div',
  delayMs = 0,
  durationMs = 700,
  distancePx = 16,
  direction = 'up'
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handle = () => setReduced(mq.matches);
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const initialTransform = useMemo(() => {
    if (direction === 'none') return 'none';
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distancePx}px, 0)`;
      case 'down':
        return `translate3d(0, -${distancePx}px, 0)`;
      case 'left':
        return `translate3d(${distancePx}px, 0, 0)`;
      case 'right':
        return `translate3d(-${distancePx}px, 0, 0)`;
      default:
        return 'none';
    }
  }, [direction, distancePx]);

  const Component = as as any;

  const styleWhenHidden = reduced
    ? { opacity: 1, transform: 'none' as const }
    : { opacity: 0, transform: initialTransform };

  const styleWhenVisible = { opacity: 1, transform: 'none' as const };

  return (
    <Box
      component={Component}
      ref={ref}
      sx={{
        willChange: 'opacity, transform',
        transition: `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`,
        transitionDelay: `${delayMs}ms`,
        ...(inView ? styleWhenVisible : styleWhenHidden)
      }}
    >
      {children}
    </Box>
  );
};

export default Reveal;

