import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';

type HeroSectionProps = {
  isRTL: boolean;
};

const HeroSection = ({ isRTL }: HeroSectionProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToHighlights = () => {
    const el = document.getElementById('highlights');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box component="section" className="hero" sx={{ pt: { xs: 8, md: 10 } }}>
      <div className="container">
        <Reveal>
          <div className="hero-overlay shadow-lg">
          <Typography variant="h1" gutterBottom>
            {t('hero.title')}
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 640, mb: 3 }}>
            {t('hero.subtitle')}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'stretch', sm: 'center' },
              justifyContent: isRTL ? 'flex-end' : 'flex-start'
            }}
          >
            <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/contact')}>
              {t('hero.primaryCta')}
            </Button>
            <Button variant="outlined" color="inherit" size="large" onClick={scrollToHighlights}>
              {t('hero.secondaryCta')}
            </Button>
          </Stack>
          </div>
        </Reveal>
      </div>
    </Box>
  );
};

export default HeroSection;
