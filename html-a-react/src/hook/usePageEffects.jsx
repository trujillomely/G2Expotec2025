// src/hooks/usePageEffects.js
import { useEffect } from 'react';

function usePageEffects() {
  useEffect(() => {
    const backToTopBtn = document.querySelector('.back-to-top');

    function handleScroll() {
      if (window.scrollY > 100) {
        backToTopBtn?.classList.add('show');
      } else {
        backToTopBtn?.classList.remove('show');
      }
    }

    function scrollToTop(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('scroll', handleScroll);
    backToTopBtn?.addEventListener('click', scrollToTop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      backToTopBtn?.removeEventListener('click', scrollToTop);
    };
  }, []);
}

export default usePageEffects;
