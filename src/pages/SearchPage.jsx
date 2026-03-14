import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../context/GifContext'
import FilterGifs from '../components/FilterGifs'
import LoadMore from '../components/LoadMore'

import Loader from '../components/Loader'
const Gif = lazy(() => import("../components/Gif"))

const PAGE_SIZE = 20

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const { gf, filter } = useContext(GifContext)
  const { query } = useParams()

  const fetchSearchResults = async (offset = 0, append = false) => {
    const { data } = await gf.search(query, {
      limit: PAGE_SIZE,
      offset,
      type: filter,
      lang: 'en',
      sort: 'relevant',
    })
    const list = data || []
    if (append) {
      setSearchResults((prev) => [...prev, ...list])
    } else {
      setSearchResults(list)
    }
    setHasMore(list.length === PAGE_SIZE)
  }

  useEffect(() => {
    setHasMore(true)
    fetchSearchResults(0, false)
  }, [filter, query])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    await fetchSearchResults(searchResults.length, true)
    setLoadingMore(false)
  }

  return (
    <div className='my-4'>
      <h2 className='text-5xl font-extrabold pb-3'>{query}</h2>
      <FilterGifs alignLeft="true" />

      {searchResults.length ? (
        <Suspense fallback={<Loader />}>
          <div className='columns-2 md:columns-3 lg:columns-4 gap-2'>
            {searchResults.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
          <LoadMore onClick={handleLoadMore} loading={loadingMore} hasMore={hasMore} />
        </Suspense>
      ) : (
        <span>No Gifs found for {query}. Try searching for Stickers instead?</span>
      )}
    </div>
  )
}

export default SearchPage
