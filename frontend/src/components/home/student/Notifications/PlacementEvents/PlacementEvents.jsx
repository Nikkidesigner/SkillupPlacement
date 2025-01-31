import React from "react"
import "./PlacementEvents.css"

const PlacementEvents = () => {
  const events = [
    { id: 1, title: "Tech Company A Recruitment", date: "2023-06-15" },
    { id: 2, title: "Career Fair", date: "2023-06-20" },
    { id: 3, title: "Mock Interview Session", date: "2023-06-25" },
  ]

  return (
    <div className="placement-events">
      <h2>Placement Events</h2>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlacementEvents
