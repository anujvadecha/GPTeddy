import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [parentName, setParentName] = useState("Parent")
    // Replace this URL with your API endpoint for the parent image
    const parentImageUrl = 'https://via.placeholder.com/50';

    return (
        <nav className="flex items-center justify-between flex-wrap bg-brown-800 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src={parentImageUrl} alt="Parent" className="h-8 w-8 rounded-full mr-2" />
                <span className="font-semibold text-xl tracking-tight">Hi {parentName}</span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">

                </div>
                <div className="flex items-center justify-end">
                    <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                        About
                    </Link>
                    <Link to="/settings" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-brown-800 hover:bg-white mt-4 lg:mt-0">
                        Settings
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
