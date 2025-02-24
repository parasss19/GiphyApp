import { Link } from "react-router-dom"

const Gif = ({gif, hover = true}) => {
  return (
    <div>
      {/* url of each gif look like => http://localhost:5173/gif/heatherrobertsart-birthday-happy-cake-wGKrkvHxZT6PVpw635 */}
      <Link to={`${gif.type}/${gif.slug}`} >
        <div>
          <img 
            //each gif have images property inside it have fixed_width property and inside it have webp address of gif
            src={gif?.images?.fixed_width.webp} 
            alt={gif?.title}
            className="w-full rounded object-cover transition-all duration-300"
          />

        </div>
      </Link>
    </div>
  )
}

export default Gif
