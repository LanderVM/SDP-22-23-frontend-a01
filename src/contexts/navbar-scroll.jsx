import { useEffect, useState } from 'react';

export default function useScrollHeight(threshold = 100) {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || 0;
      setIsFixed(scrollY <= prevScrollY || scrollY <= threshold);
      setPrevScrollY(scrollY);
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY, threshold]);

  return !isFixed;
}
