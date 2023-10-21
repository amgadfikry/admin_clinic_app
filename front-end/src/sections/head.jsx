import clinicPhoto from '../assets/clinicPhoto.jpg';

function Head() {
  return (
    <header className="flex flex-col lg:flex-row py-8 px-2 relative mb-5">
      <img src={clinicPhoto} alt="clinic entrance view"
        className='max-w-full h-full block mb-8 lg:mb-0 rounded-tl-full rounded-tr-full rounded-bl-full order-1 lg:order-2
        drop-shadow-2xl lg:w-1/2'></img>
      <section className='order-2 lg:order-1 container mx-auto lg:w-1/2 lg:flex lg:flex-col lg:justify-center'>
        <h3 className='font-thin text-7xl text-gray-500 mb-5 text-center'>Providing<br></br>Best</h3>
        <h1 className='font-[900] text-5xl text-teal-color text-center mb-5 md:text-6xl'>Medical Service</h1>
        <p className='text-dark-color text-center md:w-[75%] md:mx-auto'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus quaerat consectetur totam.
          Repellendus, fugit eius nulla laudantium modi blanditiis voluptate
        </p>
      </section>
      <div className='w-[20px] h-[50px] absolute left-0 top-10 bg-yellow-color opacity-30'></div>
      <div className='w-[20px] h-[50px] absolute left-0 bottom-[200px] bg-teal-color opacity-30'></div>
    </header>
  );
}

export default Head;