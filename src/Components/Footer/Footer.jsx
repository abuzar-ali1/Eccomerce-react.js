import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  alpha,
  Fade,
  Zoom,
  Slide,
  InputAdornment,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Pinterest,
  Email,
  Phone,
  LocationOn,
  AccessTime,
  Send,
  Security,
  LocalShipping,
  Payment,
  VerifiedUser,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: alpha("#667eea", 0.03),
    top: "-200px",
    right: "-200px",
    animation: "float 20s infinite ease-in-out",
    "@keyframes float": {
      "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
      "33%": { transform: "translateY(-20px) rotate(120deg)" },
      "66%": { transform: "translateY(20px) rotate(240deg)" },
    },
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: alpha("#fff", 0.8),
  textDecoration: "none",
  position: "relative",
  padding: "4px 0",
  transition: "all 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  "&:hover": {
    color: "#fff",
    transform: "translateX(8px)",
    "&::before": {
      width: "20px",
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: "-28px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "0",
    height: "2px",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    transition: "all 0.3s ease",
    opacity: 0,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: alpha("#fff", 0.8),
  backgroundColor: alpha("#fff", 0.05),
  border: `1px solid ${alpha("#fff", 0.1)}`,
  margin: theme.spacing(0.5),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "primary.main",
    transform: "translateY(-5px) rotate(5deg)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
    color: "#fff",
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRadius: "12px",
  background: alpha("#fff", 0.03),
  border: `1px solid ${alpha("#fff", 0.1)}`,
  transition: "all 0.3s ease",
  marginBottom: theme.spacing(2),
  "&:hover": {
    background: alpha("#667eea", 0.1),
    transform: "translateY(-5px)",
    borderColor: alpha("#667eea", 0.3),
    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.15)",
  },
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: alpha("#fff", 0.05),
    borderColor: alpha("#fff", 0.1),
    color: "#fff",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: alpha("#fff", 0.08),
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: alpha("#fff", 0.3),
      },
    },
    "&.Mui-focused": {
      backgroundColor: alpha("#fff", 0.1),
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#667eea",
        borderWidth: "2px",
      },
    },
  },
  "& .MuiInputLabel-root": {
    color: alpha("#fff", 0.7),
  },
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Fade in timeout={1000}>
      <FooterContainer>
        {/* Top Features */}
        <Slide direction="up" in timeout={800}>
          <Box
            sx={{
              py: 4,
              background: alpha("#fff", 0.02),
              borderBottom: `1px solid ${alpha("#fff", 0.05)}`,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={3} justifyContent="center">
                {[
                  {
                    icon: <LocalShipping sx={{ fontSize: 32, color: "#667eea" }} />,
                    title: "Free Shipping",
                    desc: "On orders over $50",
                  },
                  {
                    icon: <Payment sx={{ fontSize: 32, color: "#667eea" }} />,
                    title: "Secure Payment",
                    desc: "100% secure payment",
                  },
                  {
                    icon: <VerifiedUser sx={{ fontSize: 32, color: "#667eea" }} />,
                    title: "Quality Guarantee",
                    desc: "Best quality products",
                  },
                  {
                    icon: <Security sx={{ fontSize: 32, color: "#667eea" }} />,
                    title: "24/7 Support",
                    desc: "Dedicated support",
                  },
                ].map((feature, index) => (
                  <Grid item xs={6} sm={3} key={index}>
                    <Zoom in timeout={(index + 1) * 200}>
                      <FeatureCard>
                        {feature.icon}
                        <Box sx={{ ml: 2 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, color: "#fff" }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: alpha("#fff", 0.7) }}
                          >
                            {feature.desc}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>
        </Slide>

        {/* Main Footer Content */}
        <Container maxWidth="lg" sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Grid container spacing={4}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Fade in timeout={600}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    FreshCart
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, color: alpha("#fff", 0.7), lineHeight: 1.6 }}
                  >
                    Your one-stop destination for fresh groceries and daily essentials.
                    We deliver quality products with love and care.
                  </Typography>
                  
                  {/* Contact Info */}
                  <Box sx={{ mt: 3 }}>
                    {[
                      { icon: <LocationOn />, text: "123 Fresh Street, City, Country" },
                      { icon: <Phone />, text: "+1 (555) 123-4567" },
                      { icon: <Email />, text: "support@freshcart.com" },
                      { icon: <AccessTime />, text: "Mon-Sun: 8:00 AM - 10:00 PM" },
                    ].map((item, index) => (
                      <Fade in timeout={index * 100 + 800} key={index}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mb: 1.5,
                            color: alpha("#fff", 0.8),
                          }}
                        >
                          {item.icon}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {item.text}
                          </Typography>
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                </Box>
              </Fade>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} md={2}>
              <Slide direction="right" in timeout={700}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: "#fff" }}
                  >
                    Quick Links
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[
                      { text: "Home", to: "/" },
                      { text: "Shop", to: "/products" },
                      { text: "About Us", to: "/about" },
                      { text: "Contact", to: "/contact" },
                      { text: "FAQs", to: "/faq" },
                      { text: "Privacy Policy", to: "/privacy" },
                      { text: "Terms & Conditions", to: "/terms" },
                      { text: "Return Policy", to: "/returns" },
                    ].map((link, index) => (
                      <StyledLink
                        key={index}
                        component={RouterLink}
                        to={link.to}
                        variant="body2"
                      >
                        {link.text}
                      </StyledLink>
                    ))}
                  </Box>
                </Box>
              </Slide>
            </Grid>

            {/* Categories */}
            <Grid item xs={6} md={2}>
              <Slide direction="right" in timeout={800}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: "#fff" }}
                  >
                    Categories
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {[
                      "Fresh Vegetables",
                      "Fruits & Berries",
                      "Dairy & Eggs",
                      "Meat & Poultry",
                      "Bakery & Bread",
                      "Beverages",
                      "Snacks",
                      "Household",
                    ].map((category, index) => (
                      <StyledLink
                        key={index}
                        href="#"
                        variant="body2"
                      >
                        {category}
                      </StyledLink>
                    ))}
                  </Box>
                </Box>
              </Slide>
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={4}>
              <Zoom in timeout={900}>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: "#fff" }}
                  >
                    Newsletter
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, color: alpha("#fff", 0.7) }}
                  >
                    Subscribe to our newsletter and get 10% off your first order!
                  </Typography>
                  
                  <Box component="form" sx={{ mb: 4 }}>
                    <NewsletterInput
                      fullWidth
                      placeholder="Enter your email"
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              endIcon={<Send />}
                              sx={{
                                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                              }}
                            >
                              Subscribe
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  {/* Social Media */}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 2, fontWeight: 600, color: "#fff" }}
                    >
                      Follow Us
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      {[
                        { icon: <Facebook />, color: "#1877F2" },
                        { icon: <Twitter />, color: "#1DA1F2" },
                        { icon: <Instagram />, color: "#E4405F" },
                        { icon: <LinkedIn />, color: "#0A66C2" },
                        { icon: <YouTube />, color: "#FF0000" },
                        { icon: <Pinterest />, color: "#E60023" },
                      ].map((social, index) => (
                        <SocialIcon
                          key={index}
                          sx={{
                            "&:hover": {
                              backgroundColor: social.color,
                            },
                          }}
                        >
                          {social.icon}
                        </SocialIcon>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 4, backgroundColor: alpha("#fff", 0.1) }} />

          {/* Bottom Bar */}
          <Fade in timeout={1200}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: alpha("#fff", 0.7), mb: { xs: 2, md: 0 } }}
              >
                © {currentYear} FreshCart. All rights reserved.
              </Typography>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {["visa", "mastercard", "paypal", "applepay"].map((method, index) => (
                    <Zoom in timeout={index * 100 + 1000} key={index}>
                      <Box
                        sx={{
                          width: 70,
                          height: 25,
                          mx: 1,
                          background: alpha("#fff", 0.1),
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: `1px solid ${alpha("#fff", 0.2)}`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: alpha("#fff", 0.2),
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 600,
                            color: alpha("#fff", 0.8),
                            textTransform: "uppercase",
                            fontSize: "0.6rem",
                          }}
                        >
                          {method}
                        </Typography>
                      </Box>
                    </Zoom>
                  ))}
                </Box>
                
                <Typography
                  variant="body2"
                  sx={{ color: alpha("#fff", 0.7), display: { xs: "none", md: "block" } }}
                >
                  Made with ❤️ for fresh shopping
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Scroll to Top Button */}
        <Zoom in timeout={1500}>
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              right: 30,
              zIndex: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              sx={{
                minWidth: "auto",
                width: 50,
                height: 50,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                transition: "all 0.3s ease",
                animation: "bounce 2s infinite",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0 15px 40px rgba(102, 126, 234, 0.4)",
                },
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              ↑
            </Button>
          </Box>
        </Zoom>
      </FooterContainer>
    </Fade>
  );
};

export default Footer;