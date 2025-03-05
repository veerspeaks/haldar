'use client'

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { Hahmlet } from 'next/font/google'; // Keep only Hahmlet from next/font

// Initialize the Hahmlet font
const hahmlet = Hahmlet({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hahmlet'
});

// Card data with proper public folder paths
const cardsData = [
  {
    id: 1,
    title: "Web Development",
    description: "Fast, responsive websites tailored to your needs",
    longDescription: "We build fast, responsive, and user-friendly websites tailored to your business needs. From e-commerce to corporate sites, we bring your digital presence to life with cutting-edge technology.",
    cardImage: "/6d93cab524177a98ebb7d4b759b077ca.jpeg", // Added leading slash for public folder
    backgroundImage: "/bg1.png",
    buttonColor: "bg-red-700",
    buttonHoverColor: "bg-red-800"
  },
  {
    id: 2,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications",
    longDescription: "Transform your ideas into powerful mobile experiences with our native and cross-platform app development services. We deliver intuitive, high-performance apps that drive engagement and results.",
    cardImage: "/card2.jpeg", // Replace with your actual image name
    backgroundImage: "/bg2.jpeg", // Replace with your actual image name
    buttonColor: "bg-blue-600",
    buttonHoverColor: "bg-blue-700"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "Beautiful interfaces with seamless user experience",
    longDescription: "Create meaningful connections with your users through thoughtful design. Our UI/UX experts craft beautiful, intuitive interfaces that enhance user satisfaction and drive conversion rates.",
    cardImage: "/card3.jpeg", // Replace with your actual image name
    backgroundImage: "/bg3.jpeg", // Replace with your actual image name
    buttonColor: "bg-purple-600",
    buttonHoverColor: "bg-purple-700"
  },
  {
    id: 4,
    title: "Social Media",
    description: "Grow your brand with strategic social presence",
    longDescription: "Elevate your brand's social presence with our comprehensive marketing strategies. We help you connect with your audience, build community, and drive growth across all relevant platforms.",
    cardImage: "/card4.jpeg", // Replace with your actual image name
    backgroundImage: "/bg4.jpeg", // Replace with your actual image name
    buttonColor: "bg-green-600",
    buttonHoverColor: "bg-green-700"
  },
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto-rotate cards with proper timing for continuous flow
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(activeIndex);
      setIsTransitioning(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
      
      // Reset transition flag after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000); // Extended from 800ms to 1000ms
      
      return () => clearTimeout(timer);
    }, 4000); // Extended from 2500ms to 4000ms for slower rotation
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  // Debug current background
  console.log("Current background:", cardsData[activeIndex].backgroundImage);

  return (
    <>
      {/* Background container with two layers for smooth crossfade */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Previous background (fading out) */}
        {isTransitioning && (
          <div 
            className="absolute inset-0 z-0"
            style={{ 
              backgroundImage: `url('${cardsData[prevIndex].backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0,
              animation: 'bgFadeOut 0.5s ease-out forwards'
            }}
          />
        )}
        
        {/* Current background (fading in) */}
        <div 
          className="absolute inset-0 z-1"
          style={{ 
            backgroundImage: `url('${cardsData[activeIndex].backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: isTransitioning ? 'bgFadeIn 0.5s ease-out forwards' : 'none',
            opacity: isTransitioning ? 0 : 1
          }}
        />
        
        {/* Overlay gradient for better text contrast */}
        <div 
          className="absolute inset-0 z-2 bg-gradient-to-t from-black/40 to-transparent"
        />
      </div>

      {/* Transparent content container */}
      <div className={`min-h-screen w-full relative z-10 ${hahmlet.variable}`}>
        <Navbar />
        
        {/* Import Hanken Grotesk directly from Google Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" />
        
        <div className="container mx-auto px-4 pt-36 pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left content */}
            <div className="lg:w-1/2 text-white mb-12 lg:mb-0">
              {/* Header title with transition effect */}
              <div className="relative h-24 overflow-hidden">
                {/* Outgoing title */}
                {isTransitioning && prevIndex !== null && (
                  <h1 
                    className="text-5xl md:text-6xl font-bold absolute w-full font-hahmlet"
                    style={{ 
                      animation: 'slideUpOut 0.6s ease-out forwards',
                      fontFamily: 'var(--font-hahmlet)'
                    }}
                  >
                    {cardsData[prevIndex].title}
                  </h1>
                )}
                
                {/* Current title */}
                <h1 
                  className="text-5xl md:text-6xl font-bold absolute w-full font-hahmlet"
                  style={{ 
                    animation: isTransitioning ? 'slideUpIn 0.6s ease-out forwards' : 'none',
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(100%)' : 'translateY(0)',
                    fontFamily: 'var(--font-hahmlet)'
                  }}
                >
                  {cardsData[activeIndex].title}
                </h1>
              </div>
              
              {/* Description with fade transition and direct font styling */}
              <div className="relative h-32">
                {/* Outgoing description */}
                {isTransitioning && prevIndex !== null && (
                  <p 
                    className="text-xl mb-8 max-w-lg absolute"
                    style={{ 
                      animation: 'fadeOut 0.6s ease-out forwards',
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.10em"
                    }}
                  >
                    {cardsData[prevIndex].longDescription}
                  </p>
                )}
                
                {/* Current description */}
                <p 
                  className="text-xl mb-8 max-w-lg absolute"
                  style={{ 
                    animation: isTransitioning ? 'fadeIn 0.6s ease-out forwards' : 'none',
                    opacity: isTransitioning ? 0 : 1,
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    letterSpacing: "0.10em"
                  }}
                >
                  {cardsData[activeIndex].longDescription}
                </p>
              </div>
              
              {/* Button with color transition */}
              <div className="relative h-14">
                {/* Outgoing button */}
                {isTransitioning && prevIndex !== null && (
                  <button 
                    className={`absolute text-white px-8 py-3 mt-8 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${cardsData[prevIndex].buttonColor} hover:${cardsData[prevIndex].buttonHoverColor}`}
                    style={{ 
                      animation: 'fadeOut 0.6s ease-out forwards',
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 500
                    }}
                  >
                    Explore Now
                  </button>
                )}
                
                {/* Current button */}
                <button 
                  className={`absolute text-white px-8 py-3 mt-8 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${cardsData[activeIndex].buttonColor} hover:${cardsData[activeIndex].buttonHoverColor}`}
                  style={{ 
                    animation: isTransitioning ? 'fadeIn 0.6s ease-out forwards' : 'none',
                    opacity: isTransitioning ? 0 : 1,
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 500
                  }}
                >
                  Explore Now
                </button>
              </div>
            </div>
            
            {/* Right side: Card Carousel - CONTINUOUS FLOW */}
            <div className="lg:w-1/2 relative h-[500px] flex items-end pb-8 overflow-hidden">
              <div className="relative w-full overflow-hidden" style={{ height: "400px" }}>
                {cardsData.map((card, index) => {
                  // Calculate position based on relation to active index
                  const position = (index - activeIndex + cardsData.length) % cardsData.length;
                  
                  // Define card styling and position in the flow
                  let xPosition, scale, zIndex, opacity;
                  
                  if (position === 0) {
                    // Card moving out to left
                    xPosition = '-100%';  // Off to the left
                    scale = 0.8;
                    zIndex = 20;
                    opacity = 0.0;  // Changed from 0.5 to 0.0
                  } else if (position === 1) {
                    // Next card (moving to active position)
                    xPosition = '-40%';    // Center position
                    scale = 1.0;
                    zIndex = 40;        // Highest z-index as it's becoming active
                    opacity = 1;
                  } else if (position === 2) {
                    // Card entering from right
                    xPosition = '60%';   // Starting from right
                    scale = 0.8;
                    zIndex = 20;
                    opacity = 1.0;
                  } else {
                    // Other cards (off screen)
                    xPosition = '160%';  // Far right (waiting to enter)
                    scale = 0.7;
                    zIndex = 10;
                    opacity = 0;
                  }
                  
                  return (
                    <div
                      key={card.id}
                      className="absolute cursor-pointer overflow-hidden shadow-2xl"
                      style={{
                        transform: `translateX(${xPosition}) scale(${scale})`,
                        opacity,
                        zIndex,
                        transition: position === 0 
                          ? 'transform 2s cubic-bezier(0.22, 1, 0.36, 1)' // Extended from 1.2s to 2s
                          : 'all 2s cubic-bezier(0.22, 1, 0.36, 1)', // Extended from 1.2s to 2s
                        border: position === 1 ? '6px solid white' : 'none',
                        boxShadow: position === 1 ? '0 0 25px rgba(255, 255, 255, 0.4)' : 'none', // Enhanced glow effect
                        width: '280px',
                        height: '350px',
                        left: '50%',
                        top: '50px',
                        marginLeft: '-140px', // Half of width
                        transformOrigin: 'center bottom', // Scale from bottom center
                        borderRadius: '40px', // Increased border radius from 24px to 30px
                      }}
                    >
                      <img
                        src={card.cardImage}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: '26px' }} // Increased inner image border radius from 22px to 26px
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Pagination dots - moved outside of the flex container to the bottom of hero section */}
          <div className="flex justify-center mt-8 mb-4">
            {cardsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`mx-1 transition-all duration-300 rounded-full ${
                  activeIndex === index 
                    ? 'bg-white w-4 h-2' 
                    : 'bg-gray-400 w-2 h-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Add keyframe animations and font styles */}
      <style jsx global>{`
        @keyframes slideUpOut {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
        
        @keyframes slideUpIn {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes bgFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes bgFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        /* Extend animation durations for all animations */
        .text-5xl, .text-xl, button, .absolute {
          animation-duration: 0.8s !important; /* Extended from 0.6s */
        }
        
        .font-hahmlet {
          font-family: var(--font-hahmlet), serif;
        }
      `}</style>
    </>
  );
};

export default HeroSection; 