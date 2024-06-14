import { useState, useEffect, useCallback } from 'react';
import { fetchMovies } from '../service/omdbService';

const randomMovieTitles = [
  'Inception', 'The Dark Knight', 'Interstellar', 'Fight Club', 'Pulp Fiction',
  'The Shawshank Redemption', 'Forrest Gump', 'The Matrix', 'The Godfather', 'The Avengers'
];

const getRandomTitle = () => {
  const randomIndex = Math.floor(Math.random() * randomMovieTitles.length);
  return randomMovieTitles[randomIndex];
};

const useMovies = (initialSearchTerm = '') => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState();
    

  const fetchMovieData = useCallback(async (isRefresh = false) => {
    setLoading(true);
    try {
      const term = searchTerm.trim() === '' ? getRandomTitle() : searchTerm;
        const movieData = await fetchMovies(term, isRefresh ? 1 : page);
      if (movieData.Search) {
        setMovies((prevMovies) => (isRefresh || page === 1 ? movieData.Search : [...prevMovies, ...movieData.Search]));
        setHasMore(movieData.Search.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
setError(error)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setPage(1);
    setMovies([]);
    setHasMore(true);
  };

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const refreshMovies = () => {
    setRefreshing(true);
    setPage(1);
    fetchMovieData(true);
  };

  return {
    movies,
    loading,
    refreshing,
    hasMore,
    searchTerm,
    setSearchTerm: handleSearch,
    loadMoreMovies,
      refreshMovies,
    error
  };
};

export default useMovies;
