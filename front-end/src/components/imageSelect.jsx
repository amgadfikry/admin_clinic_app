import {
	BiSolidCloudUpload
} from '../import'

function ImageSelect({label, changeProfile, setChangeProfile}) {

	const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChangeProfile({ ...changeProfile, 'image': e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setChangeProfile({ ...changeProfile, 'image': null });
  }

	return (
		<div className='w-full shrink-0 py-8 px-3 text-center border rounded-lg border-gray-300 bg-white relative'>
      <input type='file' name='image' id='image' className='hidden' onChange={handleImageChange} />
        <label htmlFor='image' className='flex justify-center items-center border w-fit mx-auto py-2 px-4
          bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200'>
        <BiSolidCloudUpload className='text-2xl text-teal-color mr-3' />
        <p>{label}</p>
        </label>
      <span className='absolute text-teal-color bottom-1 left-1/2 translate-x-[-50%]'>
      	{changeProfile.image && 
      		<p className='text-sm'>Profile Photo 
          <span className='cursor-pointer text-red-500 text-lg ml-3' onClick={ handleImageDelete } >X</span></p>
      	}
      </span>
    </div>
	)
}

export default ImageSelect