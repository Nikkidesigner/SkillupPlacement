import React from "react"
import Head from "./header/Head"
import Header from "./header/Header"
import Hero from "./hero/Hero"
import Exams from "./Exams/Exams"
import StudyMaterial from "./StudyMaterial/StudyMaterial"
import Testimonal from "./testimonal/Testimonal"
import Footer from "../../common/footer/Footer"



const StudentHome = () => {
  return (
    <>
      <Header/>
      <Hero />
      <Exams/>
      <StudyMaterial/>
      <Testimonal />
      <Footer/>
    </>
  )
}

export default StudentHome;
