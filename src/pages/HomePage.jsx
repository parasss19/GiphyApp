import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'

import { GifContext } from '../context/GifContext'
import FilterGifs from '../components/FilterGifs'
import LoadMore from '../components/LoadMore'

import Loader from '../components/Loader'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20

const HomePage = () => {
  const { gf, gifs, setGifs, filter } = useContext(GifContext)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchTrendingGifs = async (offset = 0, append = false) => {
    const { data } = await gf.trending({
      limit: PAGE_SIZE,
      offset,
      type: filter,
      rating: "g",
    })
    if (append) {
      setGifs((prev) => [...prev, ...(data || [])])
    } else {
      setGifs(data || [])
    }
    setHasMore((data || []).length === PAGE_SIZE)
  }

  useEffect(() => {
    setHasMore(true)
    fetchTrendingGifs(0, false)
  }, [filter])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    await fetchTrendingGifs(gifs.length, true)
    setLoadingMore(false)
  }

  return (
    <div>
      <img src="/banner.gif" alt="banner image" className='mt-3 rounded w-full'/>

      <FilterGifs showTrendingIcon={true} />

      <Suspense fallback={<Loader />}>
        <div className='columns-2 md:columns-3 lg:columns-4 gap-2'>
          {gifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
        <LoadMore onClick={handleLoadMore} loading={loadingMore} hasMore={hasMore} />
      </Suspense>
    </div>
  )
}

export default HomePage
