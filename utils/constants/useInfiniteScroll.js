import { useState, useEffect, useRef } from 'react';

function useInfiniteScroll(fetchDataFunction, search) {
  const [currentPage, setCurrentPage] = useState(0);

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (loadMoreRef.current && observerRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [loadMoreRef.current]);

  const handleObserver = async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchDataFunction(nextPage, search); // Fetch more data for the next page
        return nextPage; // Update the state with the new page number
      });
    }
  };

  return { loadMoreRef };
}

export default useInfiniteScroll;
