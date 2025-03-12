import { useState } from "react";

import { TextField, Button, Container, Typography, Box, CircularProgress, Link } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:7000/api/v1/auth/login", values);
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        toast.success("Login Successful 🎉");

        // Redirect based on user role
        if (user.role === "student") {
          navigate("/dashboard/student");
        } else if (user.role === "staff") {
          navigate("/dashboard/staff");
        } else if (user.role === "tpo") {
          navigate("/dashboard/tpo");
        } else {
          toast.error("Unknown user role. Please contact support.");
        }

      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed!");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper", width: "100%" }}>
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Are you a student? Don&apos;t have an account?{' '}

          <Link href="/register" color="primary" underline="hover">
            Register as Student
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
