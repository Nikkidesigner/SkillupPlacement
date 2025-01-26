import React from "react"
import "./Notifications.css"
import PlacementEvents from "./PlacementEvents/PlacementEvents";   
import StaffNotifications from "./StaffNotifications/StaffNotifications";
const  Notifications= () => {
    return (
      <>
      <PlacementEvents/>
      <StaffNotifications/>
      </>
    )
  }
  
  export default Notifications;
  