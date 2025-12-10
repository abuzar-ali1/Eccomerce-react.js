import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Appbar from "./Components/AppBar/appbar";
import Footer from "./Components/Footer/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SignIn from "./Components/auth/SignIn/SignIn";
import ErrorPage from "./Components/Error/ErrorPage";
import ProductDetails from "./Components/product-details/ProductDetails";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductCard from "./Components/products/productCards";
import ProtectRoute from "./Components/protect-route/ProtectRoute";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";

// Main Layout Component that includes Appbar and Footer
const MainLayout = ({ showAppbar = true }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      {showAppbar && <Appbar />}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {showAppbar && <div style={{ height: '64px' }} />} 
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

const AuthLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: (
            <ProtectRoute>
              <ProductCard />
            </ProtectRoute>
          ),
        },
        { 
          path: "/product-Details/:product_id", 
          element: <ProductDetails /> 
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/Sign-In",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <SignIn setIsAuthenticated={setIsAuthenticated} />,
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/Sign-Up",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <div>Sign Up Page</div>, 
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/about",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <div>About Page</div>, 
        },
      ],
      errorElement: <ErrorPage />,
    },
    {
      path: "/contact",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <div>Contact Page</div>,
        },
      ],
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;