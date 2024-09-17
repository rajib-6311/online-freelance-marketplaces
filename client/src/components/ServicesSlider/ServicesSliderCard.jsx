

// eslint-disable-next-line react/prop-types
const ServicesSliderCard = ({image,text}) => {
    return (
       <div>
           <div
        className='w-full bg-center bg-cover h-[15rem] my-10'
        style={{
          backgroundImage: `url(${image})`,  
        }}
      >
        <div className='flex items-center justify-center w-full h-full '>
          <div className='text-center'>
            <h1 className='text-3xl font-semibold text-white lg:text-4xl'>
              {text}
            </h1>
            <br />
            {/* <Link to='/add-job' className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
              Post Job & Hire Expert
            </Link> */}
          </div>
        </div>
      </div>
       </div>
    );
};

export default ServicesSliderCard;