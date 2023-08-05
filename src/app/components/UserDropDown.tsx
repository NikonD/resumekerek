// Dropdown.js
import React, { useState } from 'react';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
      >
        Click to open
      </button>
      {isOpen && (
        <div className="absolute top-10 right-0 w-40 bg-white border border-gray-300 rounded-md shadow-lg">
          <ul className="py-2">
            <li className="hover:bg-gray-100 px-4 py-2">Option 1</li>
            <li className="hover:bg-gray-100 px-4 py-2">Option 2</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;
