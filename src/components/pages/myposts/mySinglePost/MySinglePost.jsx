const MySinglePost = ({ post }) => {
  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Posts: {post.category}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src={post.image} alt={post.title} className="rounded-t-lg" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{post.title}</h3>
              <p>{post.details}</p>
              <p className="text-sm text-gray-500">Category: {post.category}</p>
              <p className="text-sm">Date: {post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySinglePost;
