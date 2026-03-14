import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { GifContext } from '../context/GifContext'
import LoadMore from '../components/LoadMore'

import Loader from '../components/Loader'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20

const FavouritePage = () => {
  const { gf, favorites } = useContext(GifContext);
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteGifs([]);
      setDisplayedCount(PAGE_SIZE);
      return;
    }
    const idsToFetch = favorites.slice(0, PAGE_SIZE);
    if (idsToFetch.length === 0) return;
    const fetchFavoriteGifs = async () => {
      const { data } = await gf.gifs(idsToFetch);
      setFavoriteGifs(data || []);
    };
    fetchFavoriteGifs();
    setDisplayedCount(PAGE_SIZE);
  }, [gf, favorites]);

  const hasMore = favorites.length > displayedCount;

  const handleLoadMore = async () => {
    const start = displayedCount;
    const end = Math.min(start + PAGE_SIZE, favorites.length);
    const idsSlice = favorites.slice(start, end);
    if (idsSlice.length === 0) return;
    setLoadingMore(true);
    const { data } = await gf.gifs(idsSlice);
    setFavoriteGifs((prev) => [...prev, ...(data || [])]);
    setDisplayedCount(end);
    setLoadingMore(false);
  };

  return (
    <div className='mt-8'>
      <span className='font-[poppins] text-2xl sm:text-3xl font-bold text-gray-200'>
        My <span className='text-teal-400'>Favorites</span>
      </span>

      {favoriteGifs.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <div className='columns-2 md:columns-3 lg:columns-4 gap-2 mt-6'>
            {favoriteGifs.map((gif) => (
              <Gif gif={gif} key={gif.id} showRemoveFromFavorites />
            ))}
          </div>
          <LoadMore onClick={handleLoadMore} loading={loadingMore} hasMore={hasMore} />
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
