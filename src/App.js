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
import Contact from "./Components/Contact/Contact";
import About from "./Components/About/About";

// Main Layout Component that includes Appbar and Footer for all pages
const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Appbar />
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <ProductCard />
            </ProtectRoute>
          ),
        },
        {
          path: "product-Details/:product_id",
          element: <ProductDetails />,
        },
        {
          path: "about",
          element: <About/>,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/Sign-In",
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;