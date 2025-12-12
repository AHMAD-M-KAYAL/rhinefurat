import { Box, Typography, Grid, Card, CardContent, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

type AboutSectionProps = {
  isRTL: boolean;
};

const AboutSection = ({ isRTL }: AboutSectionProps) => {
  const { t } = useTranslation();
  const intro = t('about.intro', { returnObjects: true }) as string[] | undefined;
  const highlights = (
    t('about.highlights', { returnObjects: true }) as { title: string; detail: string; icon?: string }[] | undefined
  ) || [];
  const missionTitle = t('about.missionHeading');
  const mission = t('about.mission', { returnObjects: true }) as string[] | undefined;

  const iconFor = (key?: string) => {
    switch (key) {
      case 'contracts':
        return <GavelOutlinedIcon color="primary" />;
      case 'nda':
        return <VerifiedUserOutlinedIcon color="primary" />;
      case 'shield':
        return <ShieldOutlinedIcon color="primary" />;
      case 'partnership':
        return <HandshakeOutlinedIcon color="primary" />;
      default:
        return <ShieldOutlinedIcon color="primary" />;
    }
  };
  return (
    <Box component="section" id="about" className="section-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <Reveal>
          <Typography variant="h2" gutterBottom sx={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('about.heading')}
          </Typography>
        </Reveal>
        <Grid container spacing={4} alignItems="stretch" sx={{ mt: 1 }}>
          <Grid item xs={12} md={7}>
            <Stack spacing={2} sx={{ maxWidth: 900 }}>
              {(intro && intro.length > 0 ? intro : [t('about.text')]).map((para, idx) => (
                <Reveal key={idx} delayMs={100 + idx * 60}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: isRTL ? 'right' : 'left', lineHeight: 1.8 }}
                  >
                    {para}
                  </Typography>
                </Reveal>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Reveal delayMs={150}>
              <Card className="h-100 border-0 shadow-sm" sx={{ height: '100%' }}>
                <CardContent>
                  <Stack spacing={2}>
                    {highlights.map((h, idx) => (
                      <Stack key={idx} direction="row" spacing={2} alignItems="flex-start">
                        {iconFor(h.icon)}
                        <Box>
                          <Typography variant="subtitle1" sx={{ textAlign: isRTL ? 'right' : 'left', fontWeight: 600 }}>
                            {h.title}
                          </Typography>
                          <Typography variant="body2" sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                            {h.detail}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Reveal>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            bgcolor: (theme) => theme.palette.action.hover,
          }}
        >
          <Reveal delayMs={100}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: isRTL ? 'right' : 'left' }}>
              {missionTitle}
            </Typography>
          </Reveal>
          <Stack spacing={1.5}>
            {(mission && mission.length > 0 ? mission : []).map((line, idx) => (
              <Reveal key={idx} delayMs={140 + idx * 60}>
                <Typography variant="body1" sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                  {line}
                </Typography>
              </Reveal>
            ))}
          </Stack>
        </Box>
      </div>
    </Box>
  );
};

export default AboutSection;
