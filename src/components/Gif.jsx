import { Link } from "react-router-dom"
import { useContext } from "react"
import { HiHeart } from "react-icons/hi"
import { GifContext } from "../context/GifContext"
import toast from "react-hot-toast"

const Gif = ({ gif, hover = true, showRemoveFromFavorites = false }) => {
  if (!gif) return null
  const { favorites, addToFavorites } = useContext(GifContext)
  const isFavorited = favorites.includes(gif.id)
  const hasValidLink = gif.type && gif.slug

  const handleRemoveFromFavorites = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!gif?.id) return
    const added = addToFavorites(gif.id)
    toast.success(added ? "Added to Favorites" : "Removed from Favorites")
  }

  const content = (
    <div className="relative w-full cursor-pointer group aspect-video png-pattern">
          <img
            src={gif?.images?.fixed_width?.url}
            alt={gif?.title}
            className="w-full rounded object-cover transition-all duration-300 "
          />

          {/* Remove-from-favorites heart button (e.g. on Favourite page) - always visible */}
          {showRemoveFromFavorites && (
            <button
              type="button"
              onClick={handleRemoveFromFavorites}
              className="absolute top-2 right-2 z-10 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
              aria-label="Remove from favorites"
            >
              <HiHeart
                size={24}
                className={`${isFavorited ? "text-red-500" : "text-gray-400"} hover:scale-110 transition-transform`}
              />
            </button>
          )}

          {/* Hover effect on each gif with author name (only when user info exists) */}
          {hover && !showRemoveFromFavorites && gif?.user && (
            <div className="absolute flex items-end gap-2 p-2 font-bold inset-0 opacity-0 group-hover:opacity-100">
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name}
                className="h-8 rounded"
              />
              <span>{gif.user.display_name}</span>
            </div>
          )}

          {/* On Favourite page with remove button, still show author in bottom-left if available */}
          {hover && showRemoveFromFavorites && gif?.user && (
            <div className="absolute flex items-end gap-2 p-2 font-bold inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
              <img
                src={gif.user.avatar_url}
                alt={gif.user.display_name}
                className="h-8 rounded"
              />
              <span>{gif.user.display_name}</span>
            </div>
          )}
        </div>
  )

  return (
    <>
      {hasValidLink ? (
        <Link to={`/${gif.type}/${gif.slug}`}>{content}</Link>
      ) : (
        <div>{content}</div>
      )}
    </>
  )
}

export default Gif
