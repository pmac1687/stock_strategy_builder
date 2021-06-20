import React from 'react';

const headerForm = () => (
    <>
    <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
      <div className="flex flex-wrap">
        <div className="w-6/12">
          <a
            className="md:block text-left md:pb-2 text-gray-700 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/"
          >
            Stock Strategy Builder
          </a>
        </div>
        <div className="w-6/12 flex justify-end">
          <button
            type="button"
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
    {/* Form */}
    <form className="mt-6 mb-4 md:hidden">
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
        />
      </div>
    </form>
    </>
);

export default headerForm;