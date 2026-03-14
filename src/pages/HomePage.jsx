import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'

import { GifContext } from '../context/GifContext'
import FilterGifs from '../components/FilterGifs'
import Pagination from '../components/Pagination'

import Loader from '../components/Loader'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20
const DEFAULT_TOTAL_PAGES = 10

const HomePage = () => {
  const { gf, gifs, setGifs, filter } = useContext(GifContext)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const skipNextFetchRef = useRef(false)

  const fetchTrendingGifs = async (page = 1) => {
    setLoading(true)
    setError(null)
    try {
      const offset = (page - 1) * PAGE_SIZE
      const { data } = await gf.trending({
        limit: PAGE_SIZE,
        offset,
        type: filter,
        rating: "g",
      })
      const list = data || []
      setGifs(list)
      if (list.length < PAGE_SIZE) {
        setTotalPages(page)
      } else {
        setTotalPages((prev) => Math.max(prev, page + 1))
      }
    } catch (err) {
      setError(err?.message || "Failed to load trending GIFs")
      setGifs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(DEFAULT_TOTAL_PAGES)
    skipNextFetchRef.current = true
    fetchTrendingGifs(1)
  }, [filter])

  useEffect(() => {
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false
      return
    }
    fetchTrendingGifs(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <img src="/banner.gif" alt="banner image" className='mt-3 rounded w-full'/>

      <FilterGifs showTrendingIcon={true} />

      <Suspense fallback={<Loader />}>
        {error ? (
          <p className="text-red-400 py-4">{error}</p>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
              {gifs.map((gif) => (
                <Gif gif={gif} key={gif.id} />
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
    </div>
  )
}

export default HomePage
