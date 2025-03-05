'use client'
import { useState, useEffect } from 'react';

const CardCarousel = ({ cards, activeIndex, setActiveIndex }) => {
  // Auto-rotate cards every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [setActiveIndex, cards.length]);

  return (
    <div className="relative h-[400px] w-full flex justify-end items-center">
      {cards.map((card, index) => {
        // Calculate position based on relation to active index
        const position = (index - activeIndex + cards.length) % cards.length;
        
        // Only render the active card and the next card
        if (position > 1) return null;
        
        // Define styles based on position
        let styles = {};
        
        if (position === 0) {
          // Active card (left, larger)
          styles = {
            transform: 'translateX(-50%) scale(1.1)',
            zIndex: 20,
            opacity: 1,
            border: '2px solid white',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          };
        } else if (position === 1) {
          // Next card (right, smaller)
          styles = {
            transform: 'translateX(40%) scale(0.9)',
            zIndex: 10,
            opacity: 0.8,
          };
        }
        
        return (
          <div
            key={card.id}
            onClick={() => setActiveIndex(index)}
            className="absolute rounded-lg overflow-hidden cursor-pointer transition-all duration-700 ease-in-out"
            style={{
              ...styles,
              right: '20%',
              width: '260px',
              height: '330px',
              transition: 'all 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)',
            }}
          >
            <img
              src={card.cardImage}
              alt={card.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        );
      })}
      
      {/* Pagination dots */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mb-4">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-white w-4' : 'bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardCarousel; 