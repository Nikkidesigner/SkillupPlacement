import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

export default function ContactUs() {
  return (
    <Box
      id="ContactUs"
      sx={{
        bgcolor: '#04070b', // Dark background color
        color: '#ffffff', // Text color for contrast
        py: 8,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: '#04070b', // Dark background color
            borderRadius: 1,
            overflow: 'hidden',
            p: 2,
            position: 'relative',
          }}
        >
          <iframe
            width="100%"
            height="100%"
            title="map"
            style={{
              border: 0,
              filter: 'grayscale(0) contrast(1) opacity(1)',
            }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1336.2201927978663!2d74.19512669896618!3d17.315633010120095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1821fe27efd77%3A0xffc8eaed25aa815!2sDr.%20Daulatrao%20Aher%20College%20of%20Engineering%20Karad!5e0!3m2!1sen!2sus!4v1729420049924!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="white">
                ADDRESS
              </Typography>
              <Typography variant="body2" color="white">
                Dr. Daulatrao Aher College of Engineering Karad, Maharashtra, India
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="white">
                EMAIL
              </Typography>
              <Link href="mailto:skillupplacement@gmail.com" color="#ffffff">
                skillupplacement@gmail.com
              </Link>
              <Typography variant="subtitle2" color="white" sx={{ mt: 2 }}>
                PHONE
              </Typography>
              <Typography variant="body2" color="white">
                +91 70283 45419
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: { xs: 4, md: 0 },
          }}
        >
          <Typography variant="h6" color="white">
            Contact Us
          </Typography>
          <Typography variant="body2" color="grey.400">
            Reach out to us for any inquiries, support, or feedback we&apos;re here to help!
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, color: '#1a1a1a' }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, color: '#1a1a1a' }}
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, color: '#1a1a1a' }}
          />
          <Button variant="contained" color="primary" sx={{ alignSelf: 'flex-start' }}>
            Submit
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
