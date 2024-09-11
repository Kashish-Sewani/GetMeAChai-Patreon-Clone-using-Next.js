import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-gray-900 p-4 text-center w-full">
      <p className="text-white text-sm">
       Copyright &copy; GetMeAChai {currentYear} | All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
