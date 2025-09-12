import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="bg-[url('https://images.pexels.com/photos/4606400/pexels-photo-4606400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center sm:bg-bottom min-h-screen-safe pt-safe flex justify-between flex-col w-full">
      <div className="spacing-responsive-x pt-4 sm:pt-8">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          className="w-12 sm:w-16 lg:w-20"
          alt="Uber Logo"
        />
      </div>
      <div className="text-center spacing-responsive pb-safe">
        <h2 className="text-responsive-2xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg px-4">
          Get Started with Uber
        </h2>
        <div className="px-4">
          <Link 
            to="/login" 
            className="btn-touch inline-block w-full max-w-sm py-3 sm:py-4 rounded-lg bg-black mb-5 text-white text-responsive-base font-medium hover:bg-gray-800 transition-colors duration-200 active:scale-95"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
