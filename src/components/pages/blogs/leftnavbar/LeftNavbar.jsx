import { NavLink } from "react-router-dom";
import useBlog from "../../../../hooks/useBlog";
import useCategory from "../../../../hooks/useCategory";

const LeftNavbar = () => {
  const [blogs] = useBlog();
  const [categories] = useCategory();

  //     useEffect(() => {
  //     fetch("https://openapi.programming-hero.com/api/news/categories")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setCategories(data.data.news_category);
  //       });
  //   }, []);
  return (
    <div>
      <h2 className="font-semibold mb-3">
        Total Categories: ({categories.length})
      </h2>
      {/* <motion.h3
        animate={{ x: 50, color: ["red"] }}
        transition={{
          duration: 2,
          delay: 3,
          ease: easeOut,
          repeat: Infinity,
        }}
        className="text-5xl font-bold"
      >
        Category
        <motion.span
          animate={{ color: ["#ecff33", "#33ffe3", "#ff6133"] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="ml-3"
        >
          List
        </motion.span>{" "}
      </motion.h3> */}
      <div className="flex flex-col gap-2">
        {categories.map((item) => (
          <NavLink
            to={`/category/${item._id}`}
            key={item._id}
            className="btn bg-base-100 border-none"
          >
            {item.category}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftNavbar;
