import { Box, Typography, Stack, Chip, Card, CardContent, Button } from "@mui/material";
import Reveal from "../components/Reveal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type NearshorePageProps = { isRTL: boolean };

const NearshorePage = ({ isRTL }: NearshorePageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const benefits = t("services.nearshore.benefits", { returnObjects: true }) as string[];
  const models = t("services.nearshore.models", { returnObjects: true }) as string[];

  return (
    <Box className="section-spacing" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <Reveal>
          <Typography variant="h2" sx={{ mb: 1, textAlign: isRTL ? "right" : "left" }}>
            {t("services.nearshore.title")}
          </Typography>
        </Reveal>
        <Reveal delayMs={80}>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 900, opacity: 0.9, textAlign: isRTL ? "right" : "left" }}>
            {t("services.nearshore.subtitle")}
          </Typography>
        </Reveal>

        <Reveal delayMs={120}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, textAlign: isRTL ? "right" : "left" }}>
            {t("services.nearshore.benefitsTitle")}
          </Typography>
        </Reveal>
        <Reveal delayMs={150}>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
            {benefits?.map((b, idx) => (
              <Chip key={idx} label={b} color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={190}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, textAlign: isRTL ? "right" : "left" }}>
            {t("services.nearshore.modelsTitle")}
          </Typography>
        </Reveal>
        <Reveal delayMs={220}>
          <Stack spacing={2}>
            {models?.map((m, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{m}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={260}>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/contact")}>
              {t("services.nearshore.cta")}
            </Button>
          </Stack>
        </Reveal>
      </div>
    </Box>
  );
};

export default NearshorePage;

