import React from 'react';

const Header = (props) => (
    <>
    <hr className="my-4 md:min-w-full" />
    {/* Heading */}
    <h6 className="md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
      {props.title}
    </h6>
    </>
);

export default Header;