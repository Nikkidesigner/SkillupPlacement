import React from "react"
import Back from "../common/back/Back"
import "./contact.css"
import Footer from "../common/footer/Footer"
import Header from "../welcome/Header/Header"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.0006646873753!2d74.19595205296484!3d17.315517072308715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1821fe27efd77%3A0xffc8eaed25aa815!2sDr.%20Daulatrao%20Aher%20College%20of%20Engineering%20Karad!5e0!3m2!1sen!2sin!4v1738308042760!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade'
  
  return (
    <>
    <Header/>
      <Back title='Contact us' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className='right row'>
            <h1>Contact us</h1>
            <p>We're open for any suggestion or just to have a chat</p>
            <div className='items grid2'>
              <div className='box'>
                <h4>ADDRESS:</h4>
                <p>At post Karad, 415105</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p> skillup@gmail.com</p>
              </div>
              <div className='box'>
                <h4>PHONE:</h4>
                <p> + 91 9322242455</p>
              </div>
            </div>

            <form action=''>
              <div className='flexSB'>
                <input type='text' placeholder='Name' />
                <input type='email' placeholder='Email' />
              </div>
              <input type='text' placeholder='Subject' />
              <textarea cols='30' rows='10'>
                Create a message here...
              </textarea>
              <button className='primary-btn'>SEND MESSAGE</button>
            </form>

            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}

export default Contact
