import { memo, useState } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { HiHeart, HiOutlineHeart, HiShare, HiDownload } from "react-icons/hi"
import { GifContext } from "../context/GifContext"
import toast from "react-hot-toast"
import ShareDialog from "./ShareDialog"

// Grid: fixed_width (200px) + WebP for fast load and decent quality (lighter than downsized_*)
const getGridImageUrl = (images) => {
  const fw = images?.fixed_width
  return fw?.webp || fw?.url
}

// Hero (single GIF page): downsized_medium only – better than grid but still quick to play
const getHeroImageUrl = (images) => {
  const dm = images?.downsized_medium
  return dm?.webp || dm?.url || getGridImageUrl(images)
}

const Gif = ({ gif, hover = true, showRemoveFromFavorites = false, preferSmallImage = true, showCardActions = true }) => {
  if (!gif) return null
  const [shareOpen, setShareOpen] = useState(false)
  const { favorites, addToFavorites } = useContext(GifContext)
  const isFavorited = favorites.includes(gif.id)
  const hasValidLink = gif.type && gif.slug
  const imgUrl = preferSmallImage
    ? getGridImageUrl(gif.images)
    : getHeroImageUrl(gif.images)
  if (!imgUrl) return null

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!gif?.id) return
    const added = addToFavorites(gif.id)
    toast.success(added ? "Added to Favorites" : "Removed from Favorites")
  }

  const handleShareClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShareOpen(true)
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!gif?.id) return
    const directGifUrl = `https://media.giphy.com/media/${gif.id}/giphy.gif`
    try {
      const response = await fetch(directGifUrl)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = blobUrl
      a.download = "downloaded.gif"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
      toast.success("Gif Downloaded")
    } catch {
      toast.error("Download failed")
    }
  }

  const content = (
    <div className="relative w-full cursor-pointer group aspect-video png-pattern">
          <img
            src={imgUrl}
            alt={gif?.title}
            loading="lazy"
            decoding="async"
            className="w-full rounded object-cover transition-all duration-300 "
          />

          {/* Actions: favourite, share, download (hidden on single GIF page; use right-side FavDownShare instead) */}
          {showCardActions && (
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
              <button
                type="button"
                onClick={handleFavoriteClick}
                className="p-1 bg-transparent focus:outline-none cursor-pointer"
                aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorited ? (
                  <HiHeart size={20} className="text-red-500" />
                ) : (
                  <HiOutlineHeart size={20} className="text-white" />
                )}
              </button>
              <button
                type="button"
                onClick={handleShareClick}
                className="p-1 bg-transparent focus:outline-none cursor-pointer text-white hover:text-gray-200"
                aria-label="Share"
              >
                <HiShare size={20} />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="p-1 bg-transparent focus:outline-none cursor-pointer text-white hover:text-gray-200"
                aria-label="Download"
              >
                <HiDownload size={20} />
              </button>
            </div>
          )}

          {/* Hover effect on each gif with author name (only when user info exists) */}
          {hover && gif?.user && (
            <div className="absolute flex items-end gap-2 p-2 font-bold inset-0 opacity-0 group-hover:opacity-100">
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

  const shareUrlOverride =
    hasValidLink && typeof window !== "undefined"
      ? `${window.location.origin}/${gif.type}/${gif.slug}`
      : undefined

  return (
    <>
      {hasValidLink ? (
        <Link to={`/${gif.type}/${gif.slug}`}>{content}</Link>
      ) : (
        <div>{content}</div>
      )}
      {showCardActions && (
        <ShareDialog
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
          gif={gif}
          shareUrlOverride={shareUrlOverride}
        />
      )}
    </>
  )
}

export default memo(Gif)
