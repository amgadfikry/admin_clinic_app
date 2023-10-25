import Navbar from "./layout/navbar"
import Head from "./sections/head"
import Insurance from "./sections/insurance"
import Offers from "./sections/offers"
import Search from "./sections/search"
import Services from "./sections/services"
import Testimonial from "./sections/testimonials"


function App() {

  return (
    <>
      <Navbar />
      <Head />
      <Search />
      <Services />
      <Testimonial />
      <Offers />
      <Insurance />
    </>
  )
}

export default App
