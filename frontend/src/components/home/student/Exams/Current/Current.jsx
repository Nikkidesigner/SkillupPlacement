import React from "react";
import "./Current.css";

const currentExams = [
  { id: 1, title: "AI & Machine Learning", subject: "Computer Science" },
  { id: 2, title: "Cybersecurity Basics", subject: "Information Security" },
  { id: 3, title: "Web Development", subject: "Technology" }
];

const Current = () => {
  return (
    <div className="exam-container">
      <h2>Current Exams</h2>
      <div className="exam-list">
        {currentExams.map((exam) => (
          <div key={exam.id} className="exam-card">
            <h5>{exam.title}</h5>
            <p>{exam.subject}</p>
            <button className="attempt-btn">Attempt Exam</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Current;
