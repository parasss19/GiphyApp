import { useContext, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { ImEmbed2 } from "react-icons/im";
import { GifContext } from "../context/GifContext";
import { useParams } from "react-router-dom";
import { IoMdCopy } from "react-icons/io";
import { toast } from "react-hot-toast"


const FavDownShare = ({ singleGif, flexprop, gap, textsize, iconSize }) => {
  const { favorites, addToFavorites } = useContext(GifContext);
  const { slug } = useParams();

  const [copyURl, setCopyURl] = useState("");
  const [urlColor, setUrlColor] = useState(false);

  //favourite handler
  const favourite = () => {
    const added = addToFavorites(singleGif.id);
    toast.success(added ? "Added to Favorites" : "Removed from Favorites");
  }

  //Copy to clipboard
  const CopyToBoard = async () => {
    const url = singleGif?.images?.original?.url;
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopyURl(url);
      setUrlColor(true);
      toast.success("Link Copied!");
      setTimeout(() => setUrlColor(false), 3000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  //Download logic
  const Download = async () => {
    if (!singleGif?.url || !slug) return;

    const gifurl = slug.split("-");
    const gifid = gifurl[gifurl.length - 1];
    const directGifUrl = `https://media.giphy.com/media/${gifid}/giphy.gif`;

    try {
      // Fetch the GIF as a blob
      const response = await fetch(directGifUrl);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create a download link
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "downloaded.gif";

      // Append, click, and remove the anchor element
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Release the blob URL
      URL.revokeObjectURL(blobUrl);

      toast.success("Gif Downloaded");
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className={`${flexprop}`}>
      {/* fav btn */}
      <button
        onClick={() => favourite()}
        className={`flex ${gap} ${textsize} items-center cursor-pointer text-gray-500 hover:text-gray-200`}
      >
        <HiHeart
          size={iconSize}
          className={`transition-transform duration-300 hover:scale-125 ${
            favorites.includes(singleGif.id) ? "text-red-600" : ""
          }`}
        />
        Fav
      </button>

      {/* Copy Link btn */}
      <button
        onClick={() => CopyToBoard()}
        className={`flex ${gap} ${textsize} items-center cursor-pointer text-gray-500 hover:text-gray-200`}
      >
        <IoMdCopy
          size={iconSize}
          className={`${
            urlColor ? "text-blue-600" : ""
          }  transition-transform duration-300 hover:scale-125 `}
        />
        Copy Link
      </button>

      {/* Download btn */}
      <button
        onClick={Download}
        className={`flex ${gap} ${textsize} items-center cursor-pointer text-gray-500 hover:text-gray-200`}
      >
        <ImEmbed2
          size={iconSize}
          className={`transition-transform duration-300 hover:scale-125`}
        />
        Download
      </button>
    </div>
  );
};

export default FavDownShare;
