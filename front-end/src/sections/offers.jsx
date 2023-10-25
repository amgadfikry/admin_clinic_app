import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/sectionHeader'

const offersData = [
  { 'id': 1, 'name': 'Offer 1', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 2, 'name': 'Offer 2', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 3, 'name': 'Offer 3', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 4, 'name': 'Offer 4', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 5, 'name': 'Offer 5', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 6, 'name': 'Offer 6', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 7, 'name': 'Offer 7', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 8, 'name': 'Offer 8', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
  { 'id': 9, 'name': 'Offer 9', 'Oldprice': 100, 'Newprice': 50, 'image': 'https://picsum.photos/500/400', 'description': 'pla pla pla pla pla pla pla pla pla' },
]

function Offers() {
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
  useEffect(() => {
    Math.floor(scrollDiv.current.scrollWidth - scrollMove) <= scrollDiv.current.offsetWidth
      ? setScrollEnd(true)
      : setScrollEnd(false)
  }, [scrollMove])

  return (
    <section className="relative overflow-hidden">
      <div className='w-[20px] h-[50px] absolute left-0 top-10 bg-yellow-color opacity-30'></div>
      <div className='w-[20px] h-[50px] absolute left-0 bottom-[120px] bg-teal-color opacity-30'></div>
      <div className='py-16 px-2 container mx-auto'>
        <SectionHeader span='Our' title='Offers'
          paragraph='Choose from diffrent offers and enjoy dicount' />
        <div className="flex flex-row items-center space-x-5">
          <button disabled={scrollMove <= 0}
            className={`transition-all duration-300  cursor-pointer border rounded-lg 
          ${scrollMove <= 0
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <MdNavigateBefore className='text-4xl' onClick={handlePrevBtn} />
          </button>
          <div className="flex-1 flex flex-row items-center flex-nowrap overflow-x-scroll space-x-5 md:space-x-8 no-scrollbar scroll-smooth div-s" ref={scrollDiv}>
            {offersData.map(offer => {
              return (
                <article key={offer.id}
                  className='flex flex-col flex-1 min-w-[200px] md:min-w-[250px] lg:min-w-[300px]  rounded-lg pb-2 overflow-hidden'>
                  <div className='relative rounded-lg overflow-hidden mb-3'>
                    <img src={offer.image} alt={offer.name} className='max-w-full h-full block' />
                    <p className='absolute top-3 left-2 bg-teal-color px-3 drop-shadow-lg text-white rotate-[-2deg]'>
                      {(offer.Oldprice - offer.Newprice) / offer.Oldprice * 100}%</p>
                  </div>
                  <h4 className='text-dark-color text-lg font-medium px-1'>{offer.name}</h4>
                  <p className='px-1 mb-1'>
                    <span className='text-gray-300 line-through mr-3'>{offer.Oldprice}$</span>
                    <span className='text-teal-color'>{offer.Newprice}$</span>
                  </p>
                  <p className='text-dark-color px-1 leading-5 text-sm text-light'>{offer.description}</p>
                </article>
              )
            })}
          </div>
          <button disabled={scrollEnd}
            className={`transition-all duration-300  cursor-pointer border rounded-lg 
          ${scrollEnd
                ? 'text-gray-400 border-gray-400 hover:text-gray-400  hover:bg-transparent'
                : 'text-teal-color border-teal-color hover:text-white hover:bg-teal-color'}`}>
            <MdNavigateNext className="text-4xl" onClick={handleNextBtn} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Offers