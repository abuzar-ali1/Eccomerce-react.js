// Components/Contact/Contact.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

const Contact = () => {
  return (
    <Box sx={{ py: 8, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
            Get in touch with our team
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="400"
                image="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Contact us"
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                sx={{ mb: 3, borderRadius: "12px" }}
                InputProps={{
                  sx: { borderRadius: "12px" },
                }}
              />
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                sx={{ mb: 3, borderRadius: "12px" }}
                InputProps={{
                  sx: { borderRadius: "12px" },
                }}
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                sx={{ mb: 3, borderRadius: "12px" }}
                InputProps={{
                  sx: { borderRadius: "12px" },
                }}
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 4, borderRadius: "12px" }}
                InputProps={{
                  sx: { borderRadius: "12px" },
                }}
              />
              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                  color: "white",
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: "12px",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 15px 30px rgba(102, 126, 234, 0.4)",
                  },
                }}
              >
                Send Message
              </Button>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                Contact Information
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                <strong>Email:</strong> support@freshcart.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                <strong>Phone:</strong> +1 (555) 123-4567
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                <strong>Address:</strong> 123 Fresh Street, City, Country
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;