import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

// Define a constant for the image URL
const TEMPLATE_IMAGE_URL = import.meta.env.VITE_TEMPLATE_IMAGE_URL || 'https://mui.com/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg';

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 20%, 42%, 0.1)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[700],
  boxShadow: '0 0 24px 12px #021830',
  backgroundImage: `url(${TEMPLATE_IMAGE_URL})`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          {/* ✅ Updated Main Heading */}
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              color: 'White',
            }}
          >
            Empower&nbsp;Your&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: 'primary.light',
              }}
            >
              Career
            </Typography>
          </Typography>

          {/* ✅ Updated Description */}
          <Typography
            sx={{
              textAlign: 'center',
              color: '#7f8ba0',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Get ready for success with tailored exams, real-time assessments, and placement guidance.  
            Join SkillUpPlacement and prepare for your dream job!
          </Typography>

          {/* ✅ Added 3 Key Features */}
          <Stack spacing={1} sx={{ textAlign: 'center', color: '#b0bec5' }}>
            <Typography variant="body1">📊 Get Real-time Performance Analytics</Typography>
            <Typography variant="body1">🎯 Ace Placement Interviews with Expert Guidance</Typography>
          </Stack>

          {/* ✅ Updated Button */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: '350px' }, justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 'fit-content', justifyContent: 'center' }}
            >
              Get Started
            </Button>
          </Stack>

          {/* ✅ Updated Terms & Conditions */}
          <Typography
            variant="caption"
            color="#7f8ba0"
            sx={{ textAlign: 'center' }}
          >
            By clicking "Get Started" you agree to our&nbsp;
            <Link to="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}
