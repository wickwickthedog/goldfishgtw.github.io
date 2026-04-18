import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Blog from './components/Blog'
import Now from './components/Now'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <Skills /> */}
        {/* <Projects /> */}
        <Experience />
        {/* <Blog /> */}
        {/* <Now /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </>
  )
}
