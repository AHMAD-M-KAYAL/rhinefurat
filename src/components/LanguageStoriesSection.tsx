import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import Reveal from "./Reveal";

type Narrative = {
  language: string;
  direction: "ltr" | "rtl";
  title: string;
  lead: string;
  contact: string;
};

const LanguageStoriesSection = () => {
  const { t } = useTranslation();
  const narratives = t("story.narratives", {
    returnObjects: true,
  }) as Narrative[];

  return (
    <Box component="section" className="section-spacing">
      <div className="container">
        <Reveal>
          <Typography variant="h2" gutterBottom>
            {t("story.heading")}
          </Typography>
        </Reveal>
        <Reveal delayMs={100}>
          <Typography variant="body1" sx={{ maxWidth: 720, mb: 4 }}>
            {t("story.description")}
          </Typography>
        </Reveal>
        <div className="row g-4">
          {narratives.map((narrative, idx) => (
            <div className="col-md-4" key={narrative.language}>
              <Reveal delayMs={100 * idx}>
                <Card className="h-100 border-0 shadow-sm">
                  <CardContent>
                  <Chip
                    icon={<LanguageIcon />}
                    label={narrative.language}
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ direction: narrative.direction, mb: 1.5 }}
                  >
                    {narrative.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ direction: narrative.direction, mb: 2 }}
                  >
                    {narrative.lead}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ direction: narrative.direction }}
                  >
                    {narrative.contact}
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

export default LanguageStoriesSection;
