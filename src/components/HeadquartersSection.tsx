import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

type HeadquartersSectionProps = {
  isRTL: boolean;
};

const HeadquartersSection = ({ isRTL }: HeadquartersSectionProps) => {
  const { t } = useTranslation();
  const address = t('hq.address');

  return (
    <Box component="section" className="section-spacing">
      <div className="container">
        <Reveal>
          <Typography variant="h2" gutterBottom>
            {t('hq.heading')}
          </Typography>
        </Reveal>
        <Reveal delayMs={100}>
          <Typography variant="body1" sx={{ maxWidth: 680, mb: 4 }}>
            {t('hq.description')}
          </Typography>
        </Reveal>
        <Reveal delayMs={150}>
          <Card className="shadow-sm">
            <CardContent>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{ justifyContent: 'space-between' }}
            >
              <Stack spacing={2} sx={{ flex: 1, textAlign: isRTL ? 'right' : 'left' }}>
                {address && address.trim().length > 0 && (
                  <Stack
                    direction={isRTL ? 'row-reverse' : 'row'}
                    spacing={1.5}
                    alignItems="center"
                  >
                    <PlaceIcon color="primary" />
                    <Typography variant="body1">{address}</Typography>
                  </Stack>
                )}
                <Stack
                  direction={isRTL ? 'row-reverse' : 'row'}
                  spacing={1.5}
                  alignItems="center"
                >
                  <AccessTimeIcon color="primary" />
                  <Box>
                    <Typography variant="body1">{t('hq.hoursLabel')}</Typography>
                    <Typography variant="body2">{t('hq.hoursValue')}</Typography>
                  </Box>
                </Stack>
                <Stack
                  direction={isRTL ? 'row-reverse' : 'row'}
                  spacing={1.5}
                  alignItems="center"
                >
                  <MailOutlineIcon color="primary" />
                  <Box>
                    <Typography variant="body1">{t('hq.emailLabel')}</Typography>
                    <Typography variant="body2">{t('hq.email')}</Typography>
                  </Box>
                </Stack>
              </Stack>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
              <Box
                sx={{
                  flex: 1,
                  minHeight: 240,
                  borderRadius: 3,
                  background:
                    'linear-gradient(140deg, rgba(69,123,157,0.2), rgba(29,53,87,0.3)), url(https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&w=1200&q=80) center/cover',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="d-flex align-items-end justify-content-end p-3"
              >
                <Box
                  sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: 'rgba(29,53,87,0.65)',
                    color: '#F1FAEE',
                    padding: 2,
                    borderRadius: 2,
                    maxWidth: 260,
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                >
                  <Reveal>
                    <Typography variant="subtitle1" gutterBottom>
                      {t('hq.campusTitle')}
                    </Typography>
                  </Reveal>
                  <Reveal delayMs={100}>
                    <Typography variant="body2">{t('hq.campusDescription')}</Typography>
                  </Reveal>
                </Box>
              </Box>
            </Stack>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </Box>
  );
};

export default HeadquartersSection;
