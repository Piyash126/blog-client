import BlogPost from "./blogpost/BlogPost";
import LeftNavbar from "./leftnavbar/LeftNavbar";
import RightNavbar from "./rightnavbar/RightNavbar";

const Blogs = () => {
  return (
    <div className="grid md:grid-cols-12 gap-2">
      <div className="col-span-3">
        <LeftNavbar></LeftNavbar>
      </div>
      <div className="col-span-6">
        <BlogPost></BlogPost>
      </div>
      <div className="col-span-3">
        <RightNavbar></RightNavbar>
      </div>
    </div>
  );
};

export default Blogs;
