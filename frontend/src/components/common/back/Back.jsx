import React from "react"
import { useLocation } from "react-router-dom"

const Back = ({ title }) => {
  const location = useLocation()

  return (
    <>
    <div className='margin'></div>
      <section className='back'>
        <h2>Home / {location.pathname.split("/")[1]}</h2>
      </section>
    </>
  )
}

export default Back
