import { Box, Typography, Stack, Chip, Card, CardContent, Button } from "@mui/material";
import Reveal from "../components/Reveal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type ITRecruitmentPageProps = { isRTL: boolean };

const ITRecruitmentPage = ({ isRTL }: ITRecruitmentPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tracks = t("services.recruitment.tracks", { returnObjects: true }) as string[];
  const coverage = t("services.recruitment.coverage", { returnObjects: true }) as string[];

  return (
    <Box className="section-spacing" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <Reveal>
          <Typography variant="h2" sx={{ mb: 1, textAlign: isRTL ? "right" : "left" }}>
            {t("services.recruitment.title")}
          </Typography>
        </Reveal>
        <Reveal delayMs={80}>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 900, opacity: 0.9, textAlign: isRTL ? "right" : "left" }}>
            {t("services.recruitment.subtitle")}
          </Typography>
        </Reveal>

        <Reveal delayMs={120}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, textAlign: isRTL ? "right" : "left" }}>
            {t("services.recruitment.tracksTitle")}
          </Typography>
        </Reveal>
        <Reveal delayMs={150}>
          <Stack spacing={2} sx={{ mb: 3 }}>
            {tracks?.map((titem, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{titem}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={190}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, textAlign: isRTL ? "right" : "left" }}>
            {t("services.recruitment.coverageTitle")}
          </Typography>
        </Reveal>
        <Reveal delayMs={220}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {coverage?.map((c, idx) => (
              <Chip key={idx} label={c} color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={260}>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/contact")}>
              {t("services.recruitment.cta")}
            </Button>
          </Stack>
        </Reveal>
      </div>
    </Box>
  );
};

export default ITRecruitmentPage;

