import { Link } from "react-router-dom"

const Gif = ({gif, hover = true}) => {
  return (
    <>
      {/* url of each gif look like => http://localhost:5173/gif/heatherrobertsart-birthday-happy-cake-wGKrkvHxZT6PVpw635 */}
      <Link to={`/${gif.type}/${gif.slug}`} >
        <div className="relative w-full mb-2 cursor-pointer group aspect-video png-pattern">
          <img 
            //each gif have images property inside it have fixed_width property and inside it have webp address of gif
            src={gif?.images?.fixed_width.url} 
            alt={gif?.title}
            className="w-full rounded object-cover transition-all duration-300 "
          />

          {/* Hover effect on each gif with author name */}
          { hover && (
              <div className="absolute flex items-end gap-2 p-2 font-bold inset-0 opacity-0 group-hover:opacity-100"> 
                <img 
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className="h-8 rounded"
                />
                <span>{gif?.user?.display_name}</span>
              </div>
            )
          }

        </div>
      </Link>
    </>
  )
}

export default Gif
