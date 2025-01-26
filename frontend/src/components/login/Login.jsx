import React from "react";
import Footer from "../common/footer/Footer.jsx";
import Back from "../../components/common/back/Back.jsx";
import "./Login.css";
import Header from "../welcome/Header/Header";
const Login = () => {
  return (
    <>
      <Header />
      <Back title="Login" />
        <div className="login-page">
          <section>
            <form>
              <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input type="email" required />
                <label htmlFor="">Email</label>
              </div>
              <div className="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input type="password" required />
                <label htmlFor="">Password</label>
              </div>
              <div className="forget">
                <label htmlFor="">
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#">Forget Password</a>
              </div>
              <button>Log in</button>
              <div className="register">
                <p>
                  Don't have an account? <a href="#">Register</a>
                </p>
              </div>
            </form>
          </section>
          <script
            type="module"
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          ></script>
          <script
            nomodule
            src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          ></script>
        </div>
      <Footer />
    </>
  );
};

export default Login;
