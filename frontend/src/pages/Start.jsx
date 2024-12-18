import React from "react";

const Start = () => {
  return (
    <div className="bg-[url('https://images.pexels.com/photos/4606400/pexels-photo-4606400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-bottom h-screen pt-8 flex justify-between flex-col w-full bg-red-300">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        className="w-16 ml-8"
        alt=""
      />
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Get Started with Uber</h2>
        <button className="w-72 py-3 rounded-md mx-1 bg-black mb-5 text-white">
          Continue
        </button>
      </div>
    </div>
  );
};

export default Start;
