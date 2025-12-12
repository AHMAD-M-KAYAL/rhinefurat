import { Box, Button, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type SiteFooterProps = {
  isRTL: boolean;
};

const FOOTER_LINK_KEYS = ["linkedin", "contact"] as const;

const SiteFooter = ({ isRTL }: SiteFooterProps) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const footerCopy = t("footer.copyright", { year });
  const kvk = t("footer.kvk");
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        backgroundColor: "primary.main",
        color: "#F1FAEE",
        mt: 6,
      }}
    >
      <div className="container">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: isRTL ? "flex-end" : "flex-start", md: "center" },
            textAlign: isRTL ? "right" : "left",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Typography component="span" sx={{ mr: 2 }}>{footerCopy}</Typography>
              <Typography component="span">{kvk}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {FOOTER_LINK_KEYS.map((key) => {
                const onClick = () => {
                  if (key === "contact") {
                    navigate("/contact");
                  } else if (key === "linkedin") {
                    window.open(
                      "http://www.linkedin.com/in/samo-karazi",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }
                };
                return (
                  <Button
                    key={key}
                    variant="text"
                    color="inherit"
                    onClick={onClick}
                  >
                    {t(`footer.links.${key}`)}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Stack>
      </div>
    </Box>
  );
};

export default SiteFooter;
