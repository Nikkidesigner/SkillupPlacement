import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

const items = [
  {
    icon: <SchoolRoundedIcon sx={{ fontSize: 40, color: '#ffca28' }} />,
    title: 'Industry-Relevant Exams',
    description:
      'Practice with real-time technical and aptitude exams designed by experts to match industry standards.',
  },
  {
    icon: <QueryStatsRoundedIcon sx={{ fontSize: 40, color: '#29b6f6' }} />,
    title: 'Performance Analytics',
    description:
      'Track your progress with in-depth performance reports and insights to improve your skills.',
  },
  {
    icon: <WorkRoundedIcon sx={{ fontSize: 40, color: '#66bb6a' }} />,
    title: 'Placement Readiness',
    description:
      'Get job-ready with structured training and placement guidance from experienced professionals.',
  },
  {
    icon: <AutoGraphRoundedIcon sx={{ fontSize: 40, color: '#ff7043' }} />,
    title: 'AI-Based Question Selection',
    description:
      'Our platform dynamically selects questions based on difficulty levels to ensure better learning.',
  },
  {
    icon: <VerifiedRoundedIcon sx={{ fontSize: 40, color: '#ab47bc' }} />,
    title: 'Certified Assessments',
    description:
      'Earn certificates for successfully completed exams and boost your resume for recruiters.',
  },
  {
    icon: <AccessTimeRoundedIcon sx={{ fontSize: 40, color: '#26c6da' }} />,
    title: 'Time-Managed Tests',
    description:
      'Improve your time management skills with timed exams, just like real-world placement tests.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#04070b',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          {/* ✅ Updated Title */}
          <Typography component="h2" variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Why Choose SkillUpPlacement?
          </Typography>

          {/* ✅ Updated Description */}
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Elevate your exam preparation with **real-world placement tests, detailed analytics, and job-ready training**.
          </Typography>
        </Box>

        {/* ✅ Grid of Features */}
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                component={Card}
                spacing={2}
                sx={{
                  color: 'inherit',
                  p: 3,
                  height: '100%',
                  borderColor: 'hsla(220, 25%, 25%, 0.3)',
                  backgroundColor: '#1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Box>{item.icon}</Box>
                <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.500' }}>
                  {item.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
