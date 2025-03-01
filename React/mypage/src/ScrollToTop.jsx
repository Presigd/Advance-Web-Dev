import React, { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }, []);

  return null;
}

export default ScrollToTop;
