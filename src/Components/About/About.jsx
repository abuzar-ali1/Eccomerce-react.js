// Components/About/About.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  alpha,
} from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
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
            About FreshCart
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 4 }}>
            Your trusted partner for fresh groceries and daily essentials
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
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
                height="300"
                image="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Fresh groceries"
                sx={{ objectFit: "cover" }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 3, color: "text.primary" }}
            >
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              FreshCart was founded with a simple mission: to make fresh, 
              high-quality groceries accessible to everyone. We believe that 
              everyone deserves access to fresh produce and essential items 
              without the hassle of traditional shopping.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Our team works directly with local farmers and trusted suppliers 
              to ensure that every product meets our high standards of quality 
              and freshness.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/"
              sx={{
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                color: "white",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 15px 30px rgba(102, 126, 234, 0.4)",
                },
              }}
            >
              Shop Now
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 4,
              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Values
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              title: "Freshness Guaranteed",
              description: "Daily deliveries ensure maximum freshness",
              color: "#4CAF50",
            },
            {
              title: "Quality Products",
              description: "Carefully selected from trusted suppliers",
              color: "#2196F3",
            },
            {
              title: "Fast Delivery",
              description: "Same-day delivery in select areas",
              color: "#FF9800",
            },
            {
              title: "Customer First",
              description: "24/7 support for all your needs",
              color: "#9C27B0",
            },
          ].map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: "16px",
                  background: alpha(value.color, 0.05),
                  border: `1px solid ${alpha(value.color, 0.1)}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 15px 30px ${alpha(value.color, 0.2)}`,
                  },
                }}
              >
                <CardContent sx={{ p: 3, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: alpha(value.color, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      color: value.color,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 2, color: value.color }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;