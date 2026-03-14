import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../context/GifContext'
import FilterGifs from '../components/FilterGifs'
import Pagination from '../components/Pagination'

import Loader from '../components/Loader'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20
const DEFAULT_TOTAL_PAGES = 10

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const skipNextFetchRef = useRef(false)

  const { gf, filter } = useContext(GifContext)
  const { query } = useParams()
  const hasValidQuery = query != null && String(query).trim() !== ""

  const fetchSearchResults = async (page = 1) => {
    if (!hasValidQuery) return
    setLoading(true)
    setError(null)
    try {
      const offset = (page - 1) * PAGE_SIZE
      const { data } = await gf.search(query, {
        limit: PAGE_SIZE,
        offset,
        type: filter,
        lang: 'en',
        sort: 'relevant',
      })
      const list = data || []
      setSearchResults(list)
      if (list.length < PAGE_SIZE) {
        setTotalPages(page)
      } else {
        setTotalPages((prev) => Math.max(prev, page + 1))
      }
    } catch (err) {
      setError(err?.message || "Failed to search")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(DEFAULT_TOTAL_PAGES)
    if (!hasValidQuery) {
      setSearchResults([])
      setError(null)
      return
    }
    skipNextFetchRef.current = true
    fetchSearchResults(1)
  }, [filter, query])

  useEffect(() => {
    if (!hasValidQuery) return
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false
      return
    }
    fetchSearchResults(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (!hasValidQuery) {
    return (
      <div className='my-4'>
        <p className="text-gray-400">Enter a search term to find GIFs and stickers.</p>
      </div>
    )
  }

  return (
    <div className='my-4'>
      <h2 className='text-5xl font-extrabold pb-3'>{query}</h2>
      <FilterGifs alignLeft="true" />

      {loading && searchResults.length === 0 ? (
        <Loader />
      ) : error ? (
        <p className="text-red-400 py-4">{error}</p>
      ) : searchResults.length > 0 ? (
        <Suspense fallback={<Loader />}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                {searchResults.map((gif) => (
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
      ) : (
        <span>No Gifs found for {query}. Try searching for Stickers instead?</span>
      )}
    </div>
  )
}

export default SearchPage
