import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/PageContent/Home";
import Team from "./Pages/PageContent/Team";
import Testimonial from "./Pages/PageContent/Testimonial";
import AllBlogs from "./Pages/Blogs/AllBlogs";
import BlogsByCategory from "./Pages/Blogs/BlogsByCategory";
import BlogDetails from "./Pages/Blogs/BlogDetails";
import Course from "./Pages/PageContent/Course";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from "./Pages/PageContent/Contact";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useDispatch } from "react-redux";
import { check_token } from "./Redux/Slice/AuthSlice";


function App() {
  const dispatch = useDispatch()
  // PrivateRoute component to protect routes that require authentication
  const PrivateRoute = ({ children }) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  // Public routes array
  const publicRoutes = [
    { path: "/", component: <Home /> },
    { path: "/home", component: <Home /> },
    { path: "/login", component: <Login /> },
    {path:'/register', component: <Register/>},
    { path: "/team", component: <Team /> },
    { path: "/testimonial", component: <Testimonial /> },
    {path:"/course", component:<Course/>},
    {path:'/contact', component:<Contact/>}
  ];

  // Protected routes array (routes requiring authentication)
  const protectedRoutes = [
    { 
      path: "/blogs",
      component: <AllBlogs /> 
    },{
      
      path:'/blog-details/:id',
      component:<BlogDetails/>
  },
    {
      path: "/category/:categoryId",
      component: <BlogsByCategory />,
    },
  ];

  useEffect(() => {
    dispatch(check_token())
  }, [])
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        {/* Map through public routes and render them */}
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
        {/* Map through protected routes and render them inside PrivateRoute */}
        {protectedRoutes?.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<PrivateRoute>{route.component}</PrivateRoute>}
          />
        ))}
      </Routes>
    </Router>
    </>
  );
}

export default App;
