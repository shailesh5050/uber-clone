
import React, { useContext } from 'react'
import { useCaptainData } from '../Context/CaptainContext'
const CaptainDetails = () => {

    const { captain } = useCaptainData();
    

    return (
        <div className="w-full">
            <div className='flex items-center justify-between mb-4 sm:mb-6'>
                <div className='flex items-center justify-start gap-3 sm:gap-4 flex-1 min-w-0'>
                    <img 
                        className='h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full object-cover flex-shrink-0' 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
                        alt="Captain Avatar" 
                    />
                    <h4 className='text-responsive-base font-medium capitalize truncate'>
                        {captain?.fullname.firstname} {captain?.fullname.lastname}
                    </h4>
                </div>
                <div className="text-right flex-shrink-0">
                    <h4 className='text-responsive-lg font-semibold'>₹295.20</h4>
                    <p className='text-responsive-xs text-gray-600'>Earned</p>
                </div>
            </div>
            
            <div className='grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5 p-3 sm:p-4 lg:p-6 bg-gray-100 rounded-xl'>
                <div className='text-center'>
                    <i className="text-2xl sm:text-3xl lg:text-4xl mb-2 font-thin ri-timer-2-line text-blue-600"></i>
                    <h5 className='text-responsive-sm font-medium'>10.2</h5>
                    <p className='text-responsive-xs text-gray-600'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl sm:text-3xl lg:text-4xl mb-2 font-thin ri-speed-up-line text-green-600"></i>
                    <h5 className='text-responsive-sm font-medium'>25.4</h5>
                    <p className='text-responsive-xs text-gray-600'>Km Driven</p>
                </div>
                <div className='text-center'>
                    <i className="text-2xl sm:text-3xl lg:text-4xl mb-2 font-thin ri-booklet-line text-orange-600"></i>
                    <h5 className='text-responsive-sm font-medium'>12</h5>
                    <p className='text-responsive-xs text-gray-600'>Total Rides</p>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails