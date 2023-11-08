/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect, useState, Link, baseUrl, useCookies,
  AiOutlineDelete, AiOutlineEdit, LoadingComponent, ConfirmMsg
} from '../../import' 

function ContentOffer() {
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState("")
  const [offersData, setOffersData] = useState([])
  const [cookies] = useCookies(['token'])

  const handleDelete = (e) => {
    setConfirmDelete(e.target.id)
  }

  const functionDelete = () => {
    fetch(`${baseUrl}/api/admin/offer/${confirmDelete}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        const filterList = offersData.filter( el => el.id !== confirmDelete)
        setConfirmDelete("")
        setOffersData(filterList)
      })
  }

  useEffect(() => {
    fetch(`${baseUrl}/api/admin/offer`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + cookies.token,
      },
      mode: 'cors'
    }).then(response => response.json())
      .then(data => {
        setOffersData(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LoadingComponent />
  } else {
    return (
      <section className="">
        <header className="flex justify-between items-center pb-3 border-b mb-8">
          <h1 className="text-3xl text-teal-color font-bold">Offers</h1>
          <Link to='/offers/create'>
            <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
          hover:bg-dark-color text-white">Create new</button>
          </Link>
        </header>
        <div className="rounded-lg  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-gray-color text-left text-sm text-dark-color ">
              <thead className="bg-teal-color text-white">
                <tr className='even:bg-yellow-color whitespace-nowrap'>
                  <th scope="col" className="px-2 py-4 font-medium">#</th>
                  <th scope="col" className="px-2 py-4 font-medium">Title</th>
                  <th scope="col" className="px-2 py-4 font-medium">Speciality</th>
                  <th scope="col" className="px-2 py-4 font-medium">Old price</th>
                  <th scope="col" className="px-2 py-4 font-medium">New price</th>
                  <th scope="col" className="px-2 py-4 font-medium">Percentage</th>
                  <th scope="col" className="px-2 py-4 font-medium">Expire date</th>
                  <th scope="col" className="px-2 py-4 font-medium">Description</th>
                  <th scope="col" className="px-2 py-4 font-medium">Edit</th>
                  <th scope="col" className="px-2 py-4 font-medium">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100 text-dark-color ">
                {offersData.length === 0
                  ? (<tr> 
                      <td colSpan="10" className='text-2xl text-gray-400 whitespace-nowrap py-[125px] text-center'>
                        No current offers
                      </td>
                    </tr>)
                  : (offersData.map((offer, index) => (
                      <tr key={offer.id} className=" even:bg-gray-200 relative whitespace-nowrap">
                        {confirmDelete == offer.id && <ConfirmMsg state={setConfirmDelete} func={functionDelete} />}
                        <th className="flex gap-3 px-2 py-4 font-norma">{index + 1}</th>
                        <td className="px-2 py-4 ">{offer.title}</td>
                        <td className="px-2 py-4">{offer.speciality.name}</td>
                        <td className="px-2 py-4">{offer.old_price}</td>
                        <td className="px-2 py-4" >{offer.new_price}</td>
                        <td className="px-2 py-4" >{parseInt(offer.percentage)+"%"}</td>
                        <td className="px-2 py-4" >{offer.expire_date}</td>
                        <td className="px-2 py-4 whitespace-wrap" >{offer.description}</td>
                        <td className="px-2 py-4">
                          <Link to={`/offers/edit/${offer.title}`} state={offer}>
                            <AiOutlineEdit className='text-[24px] text-teal-color cursor-pointer' />
                          </Link>
                        </td>
                        <td className="px-2 py-4">
                          <AiOutlineDelete className='text-[24px] text-dark-color cursor-pointer'
                            onClick={handleDelete} id={offer.id} />
                        </td>
                      </tr>
                    )))
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )
  }
}

export default ContentOffer