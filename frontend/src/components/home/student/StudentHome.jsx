import React from "react"
import Head from "./header/Head"
import Header from "./header/Header"
import Hero from "./hero/Hero"
import Exams from "./Exams/Exams"
import StudyMaterial from "./StudyMaterial/StudyMaterial"
import Testimonal from "./testimonal/Testimonal"
import Footer from "../../common/footer/Footer"
import Back  from "../../common/back/Back";



const StudentHome = () => {
  return (
    <>
      <Header/>
      <Hero />
      <Back title="Home" />
      <Exams/>
      <StudyMaterial/>
      <Testimonal />
      <Footer/>
    </>
  )
}

export default StudentHome;
