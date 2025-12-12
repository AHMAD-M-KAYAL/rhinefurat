import { Box, Typography, Stack, Chip, Card, CardContent, Button } from "@mui/material";
import Reveal from "../components/Reveal";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type HireDeveloperPageProps = { isRTL: boolean };

const HireDeveloperPage = ({ isRTL }: HireDeveloperPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const points = t("services.hireDeveloper.points", { returnObjects: true }) as string[];
  const steps = t("services.hireDeveloper.steps", { returnObjects: true }) as string[];

  return (
    <Box className="section-spacing" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container">
        <Reveal>
          <Typography variant="h2" sx={{ mb: 1, textAlign: isRTL ? "right" : "left" }}>
            {t("services.hireDeveloper.title")}
          </Typography>
        </Reveal>
        <Reveal delayMs={80}>
          <Typography variant="body1" sx={{ mb: 3, maxWidth: 900, opacity: 0.9, textAlign: isRTL ? "right" : "left" }}>
            {t("services.hireDeveloper.subtitle")}
          </Typography>
        </Reveal>

        <Reveal delayMs={120}>
          <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
            {points?.map((p, idx) => (
              <Chip key={idx} label={p} color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={160}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, textAlign: isRTL ? "right" : "left" }}>
            {t("services.hireDeveloper.processTitle")}
          </Typography>
        </Reveal>

        <Reveal delayMs={190}>
          <Stack spacing={2}>
            {steps?.map((s, idx) => (
              <Card key={idx} className="border-0 shadow-sm">
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {idx + 1}. {s}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Reveal>

        <Reveal delayMs={240}>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => navigate("/contact")}>
              {t("services.hireDeveloper.cta")}
            </Button>
          </Stack>
        </Reveal>
      </div>
    </Box>
  );
};

export default HireDeveloperPage;

