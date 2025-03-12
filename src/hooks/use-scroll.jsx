
import { useState, useEffect } from 'react';

const useScroll = (threshold = 50) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we've scrolled past threshold
      if (currentScrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return { scrolled, scrollDirection };
};

export default useScroll;
