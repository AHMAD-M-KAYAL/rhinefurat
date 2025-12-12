import { IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLocation, useNavigate } from 'react-router-dom';

type BackButtonProps = {
  isRTL: boolean;
};

const BackButton = ({ isRTL }: BackButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on home page
  if (location.pathname === '/') return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 72, md: 80 },
        [isRTL ? 'right' : 'left']: 16,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <IconButton
        aria-label="Back"
        onClick={() => navigate(-1)}
        sx={{
          bgcolor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.text.primary,
          border: (theme) => `1px solid ${theme.palette.divider}`,
          boxShadow: 1,
          '&:hover': {
            bgcolor: (theme) => theme.palette.action.hover,
          },
        }}
      >
        {isRTL ? <ArrowForwardIcon /> : <ArrowBackIcon />}
      </IconButton>
    </Box>
  );
};

export default BackButton;
