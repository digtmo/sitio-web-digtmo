import CursorGlow from './components/CursorGlow.jsx'
import QuoteChatSection from './components/QuoteChatSection.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Testimonial from './components/Testimonial.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <QuoteChatSection />
        <Projects />
        <Services />
        <Process />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
