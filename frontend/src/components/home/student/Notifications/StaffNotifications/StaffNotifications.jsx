import "./StaffNotifications.css"

const StaffNotifications = () => {
  const notifications = [
    { id: 1, message: "New course materials available", date: "2023-06-14" },
    { id: 2, message: "Staff meeting scheduled for next week", date: "2023-06-16" },
    { id: 3, message: "Reminder: Submit progress reports", date: "2023-06-18" },
  ]

  return (
    <div className="staff-notifications">
      <h2>Staff Notifications</h2>
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span className="notification-date">{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StaffNotifications

