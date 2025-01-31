import React from "react";
import "./StudyMaterial.css";

const youtubeVideos = [
  { id: 1, title: "Programming Language One Shots", url: "https://www.youtube.com/watch?v=bSrm9RXwBaI&t=1612s", thumbnail: "https://img.youtube.com/vi/bSrm9RXwBaI/0.jpg" },
  { id: 2, title: "JavaScript Full Course", url: "https://www.youtube.com/watch?v=mlIUKyZIUUU", thumbnail: "https://img.youtube.com/vi/mlIUKyZIUUU/0.jpg" },
  { id: 3, title: "Python Crash Course", url: "https://www.youtube.com/watch?v=htznIeWKgg8", thumbnail: "https://img.youtube.com/vi/htznIeWKgg8/0.jpg" },
  { id: 4, title: "C++ Full Course", url: "https://www.youtube.com/watch?v=J50hZTKXEyE&t=2206s", thumbnail: "https://img.youtube.com/vi/J50hZTKXEyE/0.jpg" },
  { id: 5, title: "Java Full Course", url: "https://www.youtube.com/watch?v=1jCFUv-Xlqo", thumbnail: "https://img.youtube.com/vi/1jCFUv-Xlqo/0.jpg" },
  { id: 6, title: "React.js Full Course", url: "https://www.youtube.com/watch?v=SuLiu5AK9Ps&t=1999s", thumbnail: "https://img.youtube.com/vi/SuLiu5AK9Ps/0.jpg" },
  { id: 7, title: "Node.js Crash Course", url: "https://www.youtube.com/watch?v=jhihI4kBAN8&t=1s", thumbnail: "https://img.youtube.com/vi/jhihI4kBAN8/0.jpg" },
  { id: 8, title: "Data Structures & Algorithms", url: "https://www.youtube.com/watch?v=SqcY0GlETPk", thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/0.jpg" },
  { id: 9, title: "Machine Learning Course", url: "https://www.youtube.com/watch?v=eILUmCJhl64&t=17667s", thumbnail: "https://img.youtube.com/vi/eILUmCJhl64/0.jpg" },
  { id: 10, title: "Blockchain Development", url: "https://www.youtube.com/watch?v=ooBxSg1Cl1w", thumbnail: "https://img.youtube.com/vi/ooBxSg1Cl1w/0.jpg" },
];

const StudyMaterial = () => {
  return (
    <div className="study-container">
      <h2>Study Material - Video Tutorials</h2>
      <div className="video-slider">
        <div className="video-track">
          {youtubeVideos.map((video) => (
            <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="video-card">
              <img src={video.thumbnail} alt={video.title} />
              <p>{video.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
