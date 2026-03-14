import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { GifContext } from '../context/GifContext'
import Pagination from '../components/Pagination'

import Loader from '../components/Loader'
import { GifGridSkeleton } from '../components/GifSkeleton'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20

const FavouritePage = () => {
  const { gf, favorites } = useContext(GifContext);
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.max(1, Math.ceil(favorites.length / PAGE_SIZE));

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteGifs([]);
      setCurrentPage(1);
      return;
    }
    setCurrentPage(1);
  }, [favorites.length]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteGifs([]);
      return;
    }
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = Math.min(start + PAGE_SIZE, favorites.length);
    const idsToFetch = favorites.slice(start, end);
    if (idsToFetch.length === 0) return;
    setLoading(true);
    const fetchFavoriteGifs = async () => {
      try {
        const { data } = await gf.gifs(idsToFetch);
        setFavoriteGifs(data || []);
      } catch {
        setFavoriteGifs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteGifs();
  }, [gf, favorites, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='mt-8'>
      <span className='font-[poppins] text-2xl sm:text-3xl font-bold text-gray-200'>
        My <span className='text-teal-400'>Favorites</span>
      </span>

      {favoriteGifs.length > 0 || (favorites.length > 0 && loading) ? (
        <Suspense fallback={<Loader />}>
          {loading ? (
            <GifGridSkeleton count={20} />
          ) : (
            <>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6'>
                {favoriteGifs.map((gif) => (
                  <Gif gif={gif} key={gif.id} showRemoveFromFavorites />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                loading={loading}
              />
            </>
          )}
        </Suspense>
      ) : (
        <div className='flex flex-col justify-center items-center gap-3 w-3xs sm:w-xs mx-auto mt-4'>
          <span className='font-extrabold text-lg sm:text-2xl font-[outfit]'>No favourites</span>
          <img src="/tomJerry.gif" alt="No favourites yet" />
        </div>
      )}
    </div>
  )
}

export default FavouritePage
