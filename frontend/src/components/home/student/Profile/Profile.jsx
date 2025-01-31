import React from "react"
import "./Profile.css"
import EditProfile  from "./EditProfile/EditProfile";
import ViewProfile  from "./ViewProfile/ViewProfile";
import Header from "../header/Header";
import Footer from "../../../common/footer/Footer";
import Back  from "../../../common/back/Back";
const  Profile = () => {
    return (
      <>
      <Header/>
      <Back title="My Profile"/>
      <ViewProfile/>
      <EditProfile/>
      <Footer/>
      </>
    )
  }
  
  export default Profile;
  