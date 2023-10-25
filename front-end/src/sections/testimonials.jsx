import SectionHeader from "../components/sectionHeader"
import { useEffect, useRef, useState } from 'react'
import { BsArrowLeft, BsArrowRight, BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { BiSolidQuoteLeft, BiSolidQuoteRight } from 'react-icons/bi'

const testimonialsData = [
  {
    'id': 1, 'title': 'testimonials 1', 'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus culpa velit\
    nam minima porro, ducimus accusamus iure veritatis aperiam quod maxime excepturi quia voluptatibus quae sed officia illo ab quas!',
    'image': 'https://picsum.photos/200/200', 'name': 'amgad fikry mohamed', 'stars': 5, 'date': '2021 - 09 - 01'
  },
  {
    'id': 2, 'title': 'testimonials 2', 'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus culpa velit\
    nam minima porro, ducimus accusamus iure veritatis aperiam quod maxime excepturi quia voluptatibus quae sed officia illo ab quas!',
    'image': 'https://picsum.photos/200/200', 'name': 'amgad fikry mohamed', 'stars': 2.5, 'date': '2021 - 09 - 01'
  },
  {
    'id': 3, 'title': 'testimonials 3', 'description': 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus culpa velit\
    nam minima porro, ducimus accusamus iure veritatis aperiam quod maxime excepturi quia voluptatibus quae sed officia illo ab quas!',
    'image': 'https://picsum.photos/200/200', 'name': 'amgad fikry mohamed', 'stars': 4.5, 'date': '2021 - 09 - 01'
  },
]

function Testimonial() {
  const [scrollMove, setScrollMove] = useState(0)
  const [scrollEnd, setScrollEnd] = useState(false)

  const scrollDiv = useRef(null)

  const handleNextBtn = () => {
    const move = scrollDiv.current.offsetWidth
    setScrollMove(scrollMove + move)
    scrollDiv.current.scrollLeft += move
  }

  const handlePrevBtn = () => {
    const move = scrollDiv.current.offsetWidth
    setScrollMove(scrollMove - move)
    scrollDiv.current.scrollLeft -= move
  }

  const star = (number) => {
    let star = number
    let i = 0
    const li = []
    while (i < 5) {
      if (star >= 1) {
        li.push(<BsStarFill key={i} className="text-teal-color" />)
      } else if (star > 0) {
        li.push(<BsStarHalf key={i} className="text-teal-color" />)
      } else {
        li.push(<BsStar key={i} className="text-teal-color" />)
      }
      star--
      i++
    }
    return li
  }

  useEffect(() => {
    Math.floor(scrollDiv.current.scrollWidth - scrollMove) <= scrollDiv.current.offsetWidth
      ? setScrollEnd(true)
      : setScrollEnd(false)
  }, [scrollMove])

  return (
    <section className="py-16 px-2 bg-gray-color">
      <div className="container mx-auto">
        <SectionHeader span="What Our" title="Clients"
          paragraph="90% of our clients would recommend our servicesto others, Find out what their testimonials say." span2='Say' />
        <div className="flex flex-row items-center flex-nowrap overflow-x-scroll no-scrollbar
          scroll-smooth div-s md:space-x-8 space-x-3 pt-[20px] px-3" ref={scrollDiv}>
          {testimonialsData.map(test => {
            return (
              <article key={test.id}
                className='min-w-full md:min-w-[50%] xl:min-w-[calc(100%/3)] rounded-xl flex flex-col px-3 py-12 border-2 border-teal-color 
                text-dark-color relative text-center'>
                <BiSolidQuoteLeft className="absolute top-[-5px] left-[-5px]  text-5xl text-teal-color bg-gray-color pt-1 pl-1" />
                <BiSolidQuoteRight className="absolute bottom-[-5px] right-[-5px]  text-5xl text-teal-color bg-gray-color pb-1 pr-1" />
                <p className='mb-3  text-sm font-light leading-5'>
                  {test.description}
                </p>
                <div className="mb-5 flex space-x-1 items-center justify-center">{star(test.stars).map(star => star)}</div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-[80px] h-[80px] rounded-full border border-teal-color overflow-hidden">
                    <img src={test.image} alt={test.name} className='max-w-full h-full block' />
                  </div>
                  <div>
                    <p className='font-medium text-left '>{test.name}</p>
                    <p className="font-light text-left text-sm">{test.date}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-6 flex justify-center items-center">
          <button disabled={scrollMove <= 0}
            className={`transition-all duration-300  cursor-pointer border rounded-lg px-2 py-1 mr-2
          ${scrollMove <= 0
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <BsArrowLeft className='text-4xl' onClick={handlePrevBtn} />
          </button>
          <button disabled={scrollEnd}
            className={`transition-all duration-300  cursor-pointer border rounded-lg px-2 py-1
          ${scrollEnd
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <BsArrowRight className="text-4xl" onClick={handleNextBtn} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonial