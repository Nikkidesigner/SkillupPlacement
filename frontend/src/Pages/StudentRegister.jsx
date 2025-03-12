import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const departments = ["Mechanical", "CSE", "ENTC", "Civil"];
const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  department: Yup.string().required("Please select a department"),
  year: Yup.string().required("Please select your year"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

const StudentRegister = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      year: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:7000/api/v1/auth/register", values);
        toast.success("Registration Successful! Redirecting to login...");
        navigate("/login");
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration Failed. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h4" gutterBottom>Student Registration</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth label="Username" margin="normal" {...formik.getFieldProps("username")} error={formik.touched.username && Boolean(formik.errors.username)} helperText={formik.touched.username && formik.errors.username} />
          <TextField fullWidth label="Email" margin="normal" {...formik.getFieldProps("email")} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
          <TextField fullWidth label="Password" type="password" margin="normal" {...formik.getFieldProps("password")} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
          <TextField fullWidth label="Confirm Password" type="password" margin="normal" {...formik.getFieldProps("confirmPassword")} error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)} helperText={formik.touched.confirmPassword && formik.errors.confirmPassword} />
          <TextField select fullWidth label="Department" margin="normal" {...formik.getFieldProps("department")} error={formik.touched.department && Boolean(formik.errors.department)} helperText={formik.touched.department && formik.errors.department}>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>{dept}</MenuItem>
            ))}
          </TextField>
          <TextField select fullWidth label="Year" margin="normal" {...formik.getFieldProps("year")} error={formik.touched.year && Boolean(formik.errors.year)} helperText={formik.touched.year && formik.errors.year}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </TextField>
          <TextField fullWidth label="Phone" margin="normal" {...formik.getFieldProps("phone")} error={formik.touched.phone && Boolean(formik.errors.phone)} helperText={formik.touched.phone && formik.errors.phone} />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <a href="/login" style={{ color: "#1976d2", textDecoration: "none" }}>Login here</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default StudentRegister;
