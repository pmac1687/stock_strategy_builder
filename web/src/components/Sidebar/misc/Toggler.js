import React from 'react';

const Toggler = () => (
    <>
    <button
      className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      //onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
    >
      <i className="fas fa-bars"></i>
    </button>
    {/* Brand */}
    <a
      href='http://magyk.com'
      className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
      to="/"
    >
      Stock Strategy Builder
    </a>
    {/* User */}
    <ul className="md:hidden items-center flex flex-wrap list-none">
      
    </ul>
    </>
);

export default Toggler;