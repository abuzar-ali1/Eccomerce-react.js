import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Appbar from "./Components/AppBar/appbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./Components/auth/SignIn/SignIn";
import SignUp from "./Components/auth/SignUp/Signup";
import ErrorPage from "./Components/Error/ErrorPage";
import ProductDetails from "./Components/product-details/ProductDetails";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProductCard from "./Components/products/productCards";
import ProtectRoute from "./Components/protect-route/ProtectRoute";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Appbar />,
      children: [
        {
          path: "",
          element: (
            <ProtectRoute>
              <ProductCard />
            </ProtectRoute>
          ),
        },
        { path: "/product-Details/:product_id", element: <ProductDetails /> },
      ],
      errorElement: <ErrorPage />,
    },

    { path: "/Sign-In", element: <SignIn />, errorElement: <ErrorPage /> },
    { path: "/Sign-Up", element: <SignUp />, errorElement: <ErrorPage /> },
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
