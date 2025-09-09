import useBlog from "../../../../hooks/useBlog";
import PostsCard from "../postcard/PostsCard";

const BlogPost = () => {
  const [blogs] = useBlog();
  return (
    <div>
      <h2 className="font-semibold mb-3">Dragon News Home</h2>
      <p className="text-gray-400 text-sm">
        {blogs.length} News found on this Category
      </p>
      <div>
        {blogs.map((singleBlogs) => (
          <PostsCard
            singleBlogs={singleBlogs}
            key={singleBlogs._id}
          ></PostsCard>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
