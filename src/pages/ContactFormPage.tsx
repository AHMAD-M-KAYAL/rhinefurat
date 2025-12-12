import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../components/Reveal";
import emailjs from "@emailjs/browser";
import { COUNTRY_DIAL_CODES } from "../data/countryDialCodes";

type ContactFormPageProps = {
  isRTL: boolean;
};

const DEFAULT_COUNTRY_CODE =
  COUNTRY_DIAL_CODES.find((option) => option.code === "+31")?.code ??
  COUNTRY_DIAL_CODES[0]?.code ??
  "+1";

const ContactFormPage = ({ isRTL }: ContactFormPageProps) => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [countryCode, setCountryCode] = useState<string>(DEFAULT_COUNTRY_CODE);

  useEffect(() => {
    if (!success) return;
    const timeoutId = setTimeout(() => setSuccess(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [success]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as
      | string
      | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as
      | string
      | undefined;
    const publicKey =
      (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) ||
      (import.meta.env.VITE_EMAILJS_USER_ID as string | undefined);

    if (!serviceId || !templateId || !publicKey) {
      setError(
        "Email service is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY."
      );
      return;
    }
    if (!formRef.current) return;

    const formEl = formRef.current;
    const messageInput = formEl.elements.namedItem("message") as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    const nameInput = formEl.elements.namedItem("user_name") as
      | HTMLInputElement
      | null;
    const emailInput = formEl.elements.namedItem("user_email") as
      | HTMLInputElement
      | null;
    const phoneInput = formEl.elements.namedItem("user_phone") as
      | HTMLInputElement
      | null;
    const originalMessageValue = messageInput?.value ?? "";
    const nameValue = nameInput?.value?.trim();
    const emailValue = emailInput?.value?.trim();
    const phoneValue = phoneInput?.value?.trim();
    const combinedPhone =
      phoneValue && countryCode ? `${countryCode} ${phoneValue}` : "";

    if (messageInput) {
      const parts = [];
      if (nameValue) parts.push(`Name: ${nameValue}`);
      if (emailValue) parts.push(`Email: ${emailValue}`);
      if (combinedPhone) parts.push(`Phone Number: ${combinedPhone}`);
      if (parts.length > 0) {
        parts.push("");
        parts.push(originalMessageValue);
        messageInput.value = parts.join("\n");
      }
    }

    let didReset = false;
    try {
      console.log({ serviceId, templateId, publicKey });
      setIsSending(true);
      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      });
      setSuccess(true);
      formRef.current.reset();
      setCountryCode(DEFAULT_COUNTRY_CODE);
      didReset = true;
    } catch (err: any) {
      setError(err?.text || err?.message || "Failed to send message.");
    } finally {
      if (!didReset && messageInput) {
        messageInput.value = originalMessageValue;
      }
      setIsSending(false);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: { xs: "auto", md: "calc(100vh - 180px)" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 6, md: 10 },
      }}
      className="section-spacing"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
          px: { xs: 2, sm: 3, md: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Reveal>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              textAlign: isRTL ? "right" : "left",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {t("contact.title")}
          </Typography>
        </Reveal>
        {error && (
          <Box sx={{ width: "100%", my: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {success && (
          <Box sx={{ width: "100%", my: 2 }}>
            <Alert severity="success">{t("contact.sent")}</Alert>
          </Box>
        )}
        <Box sx={{ width: "100%" }}>
          <Reveal delayMs={100}>
            <Box
              component="form"
              ref={formRef}
              onSubmit={onSubmit}
              sx={{ width: "100%" }}
            >
              <Stack spacing={2}>
                <input
                  type="hidden"
                  name="to_email"
                  value="ahmadkayal123123@gmail.com"
                />
                <TextField
                  label="Name"
                  name="user_name"
                  type="text"
                  required
                  fullWidth
                />
                <TextField
                  label={t("contact.email")}
                  name="user_email"
                  type="email"
                  required
                  fullWidth
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems="stretch"
                >
                  <TextField
                    select
                    label={t("contact.countryCode")}
                    value={countryCode}
                    onChange={(event) => setCountryCode(event.target.value)}
                    required
                    fullWidth
                    sx={{ minWidth: { sm: 180 } }}
                  >
                    {COUNTRY_DIAL_CODES.map((option) => (
                      <MenuItem key={option.code} value={option.code}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label={t("contact.phone")}
                    name="user_phone"
                    type="tel"
                    fullWidth
                    required
                  />
                </Stack>
                <TextField
                  label={t("contact.message")}
                  name="message"
                  multiline
                  minRows={4}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : t("contact.send")}
                </Button>
              </Stack>
            </Box>
          </Reveal>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactFormPage;
