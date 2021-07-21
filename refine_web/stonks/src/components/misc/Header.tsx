import React from 'react';
import PropTypes from 'prop-types';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }: Props) => (
  <>
    <hr className='my-4 md:min-w-full' />
    {/* Heading */}
    <h6 className='md:min-w-full text-gray-600 text-xs uppercase font-bold block pt-1 pb-4 no-underline'>{title}</h6>
  </>
);

export default Header;
