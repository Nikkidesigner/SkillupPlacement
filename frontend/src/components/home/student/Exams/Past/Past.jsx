import React from "react";
import "./Past.css";

const pastExams = [
  { id: 4, title: "Data Structures & Algorithms", subject: "Computer Science" },
  { id: 5, title: "Cloud Computing", subject: "Technology" },
  { id: 6, title: "Database Management", subject: "IT" }
];

const Past = () => {
  return (
    <div className="exam-container">
      <h2>Past Exams</h2>
      <div className="exam-list">
        {pastExams.map((exam) => (
          <div key={exam.id} className="exam-card">
            <h5>{exam.title}</h5>
            <p>{exam.subject}</p>
            <button className="result-btn">Show Result</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Past;
