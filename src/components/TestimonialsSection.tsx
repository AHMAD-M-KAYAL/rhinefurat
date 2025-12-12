import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Reveal from './Reveal';

type Testimonial = {
  quote: string;
  author: string;
};

type TestimonialsSectionProps = {
  isRTL: boolean;
};

const TestimonialsSection = ({ isRTL }: TestimonialsSectionProps) => {
  const { t } = useTranslation();
  const items = t('testimonials.items', { returnObjects: true }) as Testimonial[];

  return (
    <Box
      component="section"
      className="section-spacing"
      dir={isRTL ? 'rtl' : 'ltr'}
      sx={{ bgcolor: (theme) => theme.palette.background.paper }}
    >
      <div className="container">
        <Reveal>
          <Typography variant="h2" gutterBottom sx={{ textAlign: isRTL ? 'right' : 'left' }}>
            {t('testimonials.heading')}
          </Typography>
        </Reveal>
        <div className="row g-4">
          {items.map((item, idx) => (
            <div className="col-md-4" key={item.author}>
              <Reveal delayMs={100 * idx}>
                <Card className="h-100 border-0 shadow-sm">
                  <CardContent>
                    <Typography variant="body1" sx={{ mb: 1.5, fontStyle: 'italic', textAlign: isRTL ? 'right' : 'left' }}>
                      “{item.quote}”
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: isRTL ? 'right' : 'left' }}>
                      — {item.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default TestimonialsSection;
