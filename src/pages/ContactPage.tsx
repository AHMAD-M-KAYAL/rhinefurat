import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type ContactPageProps = {
  isRTL: boolean;
};

const ContactPage = ({ isRTL }: ContactPageProps) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend; simulate send
    alert(t('contact.sent'));
    setEmail('');
    setPassword('');
    setMessage('');
  };

  return (
    <Box component="section" className="section-spacing" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container">
        <Typography variant="h2" gutterBottom sx={{ textAlign: isRTL ? 'right' : 'left' }}>
          {t('contact.title')}
        </Typography>
        <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 600 }}>
          <Stack spacing={2}>
            <TextField
              label={t('contact.email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label={t('contact.password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label={t('contact.message')}
              multiline
              minRows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {t('contact.send')}
            </Button>
          </Stack>
        </Box>
      </div>
    </Box>
  );
};

export default ContactPage;

