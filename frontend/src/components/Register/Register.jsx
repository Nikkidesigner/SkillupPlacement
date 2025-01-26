import React, {useState} from "react";
import Footer from "../common/footer/Footer.jsx";
import Back from "../common/back/Back.jsx";
import "./Register.css";
import Header from "../welcome/Header/Header.jsx";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    department: "",
    year: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and API call logic here
    console.log("Form Data Submitted:", formData);
  };
  return (
    <>
      <Header />
      <Back title="Register" />
      <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your PRN number"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder="Enter your department"
            value={formData.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <input
            type="text"
            name="year"
            placeholder="Enter your year"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
    </div>
      <Footer />
    </>
  );
};

export default Login;
