import  React from "react"
import "./ViewProfile.css"


const tempUser = {
  fullName: "John Doe",
  username: "johndoe123",
  email: "john.doe@example.com",
  department: "Computer Science",
  year: "3rd Year",
  phone: "+1 (555) 123-4567",
}

const ViewProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={"/placeholder.svg"} alt="Profile" className="profile-picture" />
          <h1>{tempUser.fullName}</h1>
          <p className="username">@{tempUser.username}</p>
        </div>
        <div className="profile-body">
          <div className="profile-info">
            <h2>Personal Information</h2>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{tempUser.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Department:</span>
              <span className="info-value">{tempUser.department}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Year:</span>
              <span className="info-value">{tempUser.year}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{tempUser.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile



