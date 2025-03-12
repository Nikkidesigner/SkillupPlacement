import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "#bbb", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="https://mui.com/">
        Sitemark
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        backgroundColor: "#121212", // Dark background
        color: "#fff", // White text
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
            Join the newsletter
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc", mb: 2 }}>
            Subscribe for weekly updates. No spam ever!
          </Typography>
          <InputLabel htmlFor="email-newsletter" sx={{ color: "#ccc" }}>
            Email
          </InputLabel>
          <Stack direction="row" spacing={1} useFlexGap>
            <TextField
              id="email-newsletter"
              hiddenLabel
              size="small"
              variant="outlined"
              fullWidth
              aria-label="Enter your email address"
              placeholder="Your email address"
              sx={{ width: "250px", backgroundColor: "#fff", borderRadius: "4px" }}
            />
            <Button variant="contained" color="primary" size="small">
              Subscribe
            </Button>
          </Stack>
        </Box>

        {/* Product Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Product
          </Typography>
          <Link color="#ccc" variant="body2" href="#">Features</Link>
          <Link color="#ccc" variant="body2" href="#">Testimonials</Link>
          <Link color="#ccc" variant="body2" href="#">Pricing</Link>
          <Link color="#ccc" variant="body2" href="#">FAQs</Link>
        </Box>

        {/* Company Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Company
          </Typography>
          <Link color="#ccc" variant="body2" href="#">About us</Link>
          <Link color="#ccc" variant="body2" href="#">Careers</Link>
          <Link color="#ccc" variant="body2" href="#">Press</Link>
        </Box>

        {/* Legal Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column", gap: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: "medium" }}>
            Legal
          </Typography>
          <Link color="#ccc" variant="body2" href="#">Terms</Link>
          <Link color="#ccc" variant="body2" href="#">Privacy</Link>
          <Link color="#ccc" variant="body2" href="#">Contact</Link>
        </Box>
      </Box>

      {/* Bottom Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid #444",
        }}
      >
        <div>
          <Link color="#ccc" variant="body2" href="#">Privacy Policy</Link>
          <Typography sx={{ display: "inline", mx: 0.5, opacity: 0.5, color: "#bbb" }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color="#ccc" variant="body2" href="#">Terms of Service</Link>
          <Copyright />
        </div>

        {/* Social Media Icons */}
        <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: "left" }}>
          <IconButton color="inherit" size="small" href="https://github.com/mui" aria-label="GitHub">
            <GitHubIcon sx={{ color: "#ccc" }} />
          </IconButton>
          <IconButton color="inherit" size="small" href="https://twitter.com" aria-label="Twitter">
            <TwitterIcon sx={{ color: "#ccc" }} />
          </IconButton>
          <IconButton color="inherit" size="small" href="https://www.linkedin.com" aria-label="LinkedIn">
            <LinkedInIcon sx={{ color: "#ccc" }} />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
