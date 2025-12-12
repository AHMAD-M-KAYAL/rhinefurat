import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
type HighlightsSectionProps = {
  isRTL: boolean;
};
type HighlightItem = {
  title: string;
  detail: string;
};
const HighlightsSection = ({ isRTL }: HighlightsSectionProps) => {
  const { t } = useTranslation();
  const highlights = t("highlights.cards", {
    returnObjects: true,
  }) as HighlightItem[];
  const whatWeDoHeading = t("highlights.whatWeDo.heading");
  const whatWeDoText = t("highlights.whatWeDo.text");
  const transparencyHeading = t("highlights.transparency.heading");
  const transparencyPoints = t("highlights.transparency.points", {
    returnObjects: true,
  }) as string[];
  return (
    <Box
      component="section"
      id="highlights"
      className="section-spacing"
      dir={isRTL ? "rtl" : "ltr"}
      sx={{ bgcolor: (theme) => theme.palette.background.paper }}
    >
      <div className="container">
        <Reveal>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ textAlign: isRTL ? "right" : "left" }}
          >
            {t("highlights.heading")}
          </Typography>
        </Reveal>
        {/* What we do intro */}
        {whatWeDoText && (
          <>
            <Reveal delayMs={60}>
              <Typography
                variant="h5"
                sx={{ textAlign: isRTL ? "right" : "left", mt: 0.5 }}
              >
                {whatWeDoHeading}
              </Typography>
            </Reveal>
            <Reveal delayMs={100}>
              <Typography
                variant="body1"
                sx={{ maxWidth: 1000, textAlign: isRTL ? "right" : "left", mb: 2 }}
              >
                {whatWeDoText}
              </Typography>
            </Reveal>
          </>
        )}
        <div className="row g-4">
          {highlights.map((item, idx) => (
            <div className="col-md-4" key={item.title}>
              <Reveal delayMs={100 * idx}>
                <Card className="h-100 border-0 shadow-sm">
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1.5, textAlign: isRTL ? "right" : "left" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {item.detail}
                    </Typography>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          ))}
        </div>
        {/* Transparency & communication bullets */}
        {transparencyPoints && transparencyPoints.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Reveal delayMs={60}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: isRTL ? "right" : "left" }}
              >
                {transparencyHeading}
              </Typography>
            </Reveal>
            <Stack spacing={1.25} sx={{ maxWidth: 900 }}>
              {transparencyPoints.map((point, idx) => (
                <Reveal key={idx} delayMs={90 + idx * 60}>
                  <Stack direction="row" spacing={1.25} alignItems="flex-start">
                    <CheckCircleOutlineIcon color="primary" sx={{ mt: 0.2 }} />
                    <Typography
                      variant="body1"
                      sx={{ textAlign: isRTL ? "right" : "left" }}
                    >
                      {point}
                    </Typography>
                  </Stack>
                </Reveal>
              ))}
            </Stack>
          </Box>
        )}
      </div>
    </Box>
  );
};
export default HighlightsSection;
