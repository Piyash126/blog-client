import { BsBookmark } from "react-icons/bs";
import { FaEye, FaShareAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostsCard = ({ singleBlogs }) => {
  const {
    author,
    title,
    image,
    details,
    rating,
    views,
    date,
    _id,

    // author: { name, img, published_date },
  } = singleBlogs;

  return (
    <div className="card bg-base-100 shadow-md border rounded-lg mb-4">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt="author"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-sm font-semibold">{author || "Unknown"}</h2>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex gap-2 text-lg text-gray-500">
          <BsBookmark />
          <FaShareAlt />
        </div>
      </div>

      {/* Title & Image */}
      <div className="px-4">
        <h2 className="text-lg font-bold leading-snug mb-2">{title}</h2>
      </div>
      <figure>
        <img
          src={image}
          alt="singleNews"
          className="w-full max-h-60 object-cover"
        />
      </figure>

      {/* Details */}
      <div className="px-4 pt-4 text-sm text-gray-600">
        {details.length > 200 ? (
          <>
            {details.slice(0, 200)}...
            <Link
              to={`/news/${singleBlogs._id}`}
              className="text-red-500 font-medium ml-1 cursor-pointer"
            >
              Read More
            </Link>
          </>
        ) : (
          details
        )}
        {/* <div>
          <Link
            to={`/news/${singleBlogs._id}`}
            className="text-green-500 font-medium ml-1 cursor-pointer mt-4"
          >
            Write Comment
          </Link>
        </div> */}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 pt-2 text-sm text-gray-700">
        <div className="flex items-center gap-1 text-orange-500">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(rating.number)
                  ? "text-orange-500"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="ml-2 text-gray-600">{rating.number}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaEye />
          <span>{views || 0}</span>
        </div>
        <div>
          <div className="card-actions">
            <Link
              to={`/updateblog/${singleBlogs._id}`}
              className="btn btn-primary"
            >
              Update Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
