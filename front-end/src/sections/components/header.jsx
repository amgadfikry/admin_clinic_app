import {
	Link
} from '../../import'
import headerPhoto from '../../assets/header.jpg'

function Header() {
	return(
		<header className="relative">
			<div className='rounded-b-lg h-[200px]'>
				<img className='max-w-full h-full block' src={headerPhoto} 
				alt='Image by wwwfreepikcom' />
			</div>
      <h1 className="text-3xl text-teal-color font-bold">Specialities</h1>
      <Link to='/dashboard/specialities/create'>
          <button className="py-1 px-3 text-medium bg-teal-color rounded-lg transition-all duration-300 cursor-pointer
        	hover:bg-dark-color text-white">Create new</button>
     	</Link>
    </header>
		)
}

export default Header