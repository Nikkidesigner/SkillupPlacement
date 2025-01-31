import React from "react"
import "./Notifications.css"
import PlacementEvents from "./PlacementEvents/PlacementEvents";   
import StaffNotifications from "./StaffNotifications/StaffNotifications";
import Header from "../header/Header";
import Footer from "../../../common/footer/Footer";
import Back  from "../../../common/back/Back";
const  Notifications= () => {
    return (
      <>
      <Header/>
      <Back title="Notifications" />
      <div className="margin">

      </div>
      <PlacementEvents/>
      <StaffNotifications/>
      <Footer/>
      </>
    )
  }
  
  export default Notifications;
  