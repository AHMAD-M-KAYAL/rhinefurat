import { Box, Typography, Grid, Card, CardContent, Chip, Stack, Button } from "@mui/material";
import Reveal from "../components/Reveal";
import { useTranslation } from "react-i18next";

type ResourcesPageProps = { isRTL: boolean };

type ResourceItem = {
  title: string;
  kind: string;
  summary: string;
  cta?: string;
  href?: string;
};

const ResourcesPage = ({ isRTL }: ResourcesPageProps) => {
  const { t } = useTranslation();
  const items = t('resources.items', { returnObjects: true }) as ResourceItem[];

  return (
    <Box className="section-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <Reveal>
          <Typography variant="h2" sx={{ mb: 1, textAlign: isRTL ? 'right' : 'left' }}>
            {t('resources.title')}
          </Typography>
        </Reveal>
        <Reveal delayMs={80}>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 900, opacity: 0.9, textAlign: isRTL ? 'right' : 'left' }}>
            {t('resources.subtitle')}
          </Typography>
        </Reveal>

        <Grid container spacing={2}>
          {items?.map((it, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Reveal delayMs={100 + idx * 40}>
                <Card className="border-0 shadow-sm">
                  <CardContent>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Chip size="small" label={it.kind} color="primary" variant="outlined" />
                    </Stack>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                      {it.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                      {it.summary}
                    </Typography>
                    {it.cta && (
                      <Button size="small" variant="contained" color="primary" href={it.href || '#'}>
                        {it.cta}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default ResourcesPage;

