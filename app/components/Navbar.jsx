import Link from 'next/link';
import { FaSearch, FaChevronDown } from 'react-icons/fa'; // Using react-icons
import { FaRegUser } from 'react-icons/fa6'; // Import user icon
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex items-center justify-between bg-transparent">
      {/* Logo/Brand Section */}
      <div className="flex items-center">
        <Link href="/" className="mr-8">
          <div className="h-14 w-14">
            <img 
              src="/logo.png" 
              alt="logo" 
              className="h-14 w-14 w-auto"
            />
          </div>
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-white font-medium hover:text-amber-500 transition-colors duration-300">
          Home
        </Link>
        <Link href="/about" className="text-white font-medium hover:text-amber-500 transition-colors duration-300">
          About
        </Link>
        <div className="relative group">
          <Link href="/services" className="text-white font-medium hover:text-amber-500 transition-colors duration-300 flex items-center">
            Services
            <FaChevronDown className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <div className="relative group">
          <Link href="/projects" className="text-white font-medium hover:text-amber-500 transition-colors duration-300 flex items-center">
            Projects
            <FaChevronDown className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <Link href="/pricing" className="text-white font-medium hover:text-amber-500 transition-colors duration-300">
          Pricing
        </Link>
        <Link href="/contact" className="text-white font-medium hover:text-amber-500 transition-colors duration-300">
          Contact
        </Link>
      </div>
      
      {/* Right Side Elements - Updated to match the image design */}
      <div className="flex items-center">
        {/* Search Icon */}
        <button className="text-white hover:text-amber-500 transition-colors duration-300 mr-6">
          <FaSearch className="h-5 w-5" />
        </button>
        
        {/* Divider Line */}
        <div className="h-6 w-px bg-white/30 mr-6"></div>
        
        {/* Sign In/Sign Up with User Icon */}
        <Link href="/signin" className="flex items-center text-white hover:text-amber-500 transition-colors duration-300">
          <div className="flex items-center justify-center bg-white/10 rounded-full p-2 mr-3">
            <FaRegUser className="h-4 w-4" />
          </div>
          <span className="text-lg">Sign In / Sign Up</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar; 