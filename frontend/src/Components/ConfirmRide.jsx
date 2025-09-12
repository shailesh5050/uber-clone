const ConfirmRide = (props) => {
    return (
        <div className="w-full">
            <h5 className='btn-touch p-2 text-center w-full absolute top-2 sm:top-4' onClick={() => {
                props.setConfirmRidePanelOpen(false)
            }}>
                <i className="text-2xl sm:text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
            </h5>
            
            <h3 className='text-responsive-2xl font-semibold mb-4 sm:mb-6 text-center'>Confirm your Ride</h3>

            <div className='flex flex-col items-center space-y-4 sm:space-y-6'>
                <img 
                    className='h-16 sm:h-20 lg:h-24 w-auto object-contain' 
                    src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
                    alt="Vehicle" 
                />
                
                <div className='w-full space-y-1'>
                    <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b-2 border-gray-100'>
                        <i className="ri-map-pin-user-fill text-responsive-base text-green-600 flex-shrink-0"></i>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-responsive-base font-medium truncate'>{props.pickup.split(',')[0]}</h3>
                            <p className='text-responsive-xs text-gray-600 truncate'>{props.pickup}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-b-2 border-gray-100'>
                        <i className="ri-map-pin-2-fill text-responsive-base text-red-600 flex-shrink-0"></i>
                        <div className="flex-1 min-w-0">
                            <h3 className='text-responsive-base font-medium truncate'>{props.destination.split(',')[0]}</h3>
                            <p className='text-responsive-xs text-gray-600 truncate'>{props.destination}</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4'>
                        <i className="ri-currency-line text-responsive-base text-gray-600 flex-shrink-0"></i>
                        <div>
                            <h3 className='text-responsive-lg font-medium'>₹{props.fair}</h3>
                            <p className='text-responsive-xs text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => {
                        props.setConfirmRidePanelOpen(false)
                        props.setLookingForDriverPanelOpen(true)
                        props.createRide()
                    }} 
                    className='btn-touch w-full bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-lg text-responsive-base hover:bg-green-700 active:scale-95 transition-all duration-200'
                >
                    Confirm Ride
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide