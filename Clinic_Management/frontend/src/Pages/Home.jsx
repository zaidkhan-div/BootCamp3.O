import React from 'react'
import Hero from "../components/Common/HeroSection"
import TimingScehdual from '../components/Common/TimingScehdual'
import AboutSection from '../components/Common/AboutSection'
import Services from '../components/Common/Services'
import Cta from '../components/Common/Cta'
import ChooseUs from '../components/Common/ChooseUs'
import Testimonials from '../components/Common/Testimonial'

const Home = () => {
  return (
    <div>
      <Hero />
      <TimingScehdual />
      <AboutSection />
      <Cta />
      <Services />
      <ChooseUs />
      <Testimonials />
    </div>
  )
}

export default Home