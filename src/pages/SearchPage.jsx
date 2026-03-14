import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
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

  const { gf, filter } = useContext(GifContext)
  const { query } = useParams()

  const fetchSearchResults = async (page = 1) => {
    setLoading(true)
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
    setLoading(false)
  }

  useEffect(() => {
    setCurrentPage(1)
    setTotalPages(DEFAULT_TOTAL_PAGES)
  }, [filter, query])

  useEffect(() => {
    fetchSearchResults(currentPage)
  }, [currentPage, filter, query])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className='my-4'>
      <h2 className='text-5xl font-extrabold pb-3'>{query}</h2>
      <FilterGifs alignLeft="true" />

      {loading && searchResults.length === 0 ? (
        <Loader />
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
