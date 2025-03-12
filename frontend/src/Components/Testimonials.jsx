import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// ✅ Testimonials from Students, Staff, and TPOs
const userTestimonials = [
  {
    avatar: <Avatar alt="Alice Johnson" src="/static/images/avatar/1.jpg" />,
    name: 'Alice Johnson',
    occupation: 'Final Year Student - CSE',
    testimonial:
      "SkillUpPlacement helped me improve my aptitude skills and ace my placement exams. The AI-based question selection really made a difference in my preparation!",
  },
  {
    avatar: <Avatar alt="Mark Williams" src="/static/images/avatar/2.jpg" />,
    name: 'Mark Williams',
    occupation: 'Senior Faculty - Mechanical',
    testimonial:
      "As a faculty member, I can confidently say that the platform provides structured exams that challenge students while preparing them for real-world assessments.",
  },
  {
    avatar: <Avatar alt="Sophia Patel" src="/static/images/avatar/3.jpg" />,
    name: 'Sophia Patel',
    occupation: 'TPO - Placement Officer',
    testimonial:
      'The analytics and exam performance tracking have helped me identify top students and provide better guidance for job placements.',
  },
  {
    avatar: <Avatar alt="David Lee" src="/static/images/avatar/4.jpg" />,
    name: 'David Lee',
    occupation: 'Final Year Student - ECE',
    testimonial:
      "The real-time feedback and time-based exams gave me a realistic test-taking experience. I feel much more confident now!",
  },
  {
    avatar: <Avatar alt="Emma Watson" src="/static/images/avatar/5.jpg" />,
    name: 'Emma Watson',
    occupation: 'Software Engineer at Google',
    testimonial:
      "The placement training provided by SkillUpPlacement helped me land my dream job at Google. The structured exams were exactly what I needed.",
  },
  {
    avatar: <Avatar alt="Robert Brown" src="/static/images/avatar/6.jpg" />,
    name: 'Robert Brown',
    occupation: 'TPO - University Coordinator',
    testimonial:
      "We have seen a significant improvement in student placement rates since we started using this platform. It's an essential tool for any university!",
  },
];

export default function Testimonials() {
  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        color: 'white',
        bgcolor: '#04070b', // Dark theme background
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        {/* ✅ Updated Title */}
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.light' }}
        >
          What Our Users Say
        </Typography>

        {/* ✅ Updated Description */}
        <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Hear from students, staff, and placement officers who have benefited from our platform.
          **SkillUpPlacement** is designed to enhance learning, track performance, and boost employability.
        </Typography>
      </Box>

      {/* ✅ Grid of Testimonials */}
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                bgcolor: 'grey.900', // Dark background for cards
                color: '#b0bec5',
                p: 2,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'grey.300' }}
                >
                  "{testimonial.testimonial}"
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                  sx={{ color: 'grey.400' }}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
