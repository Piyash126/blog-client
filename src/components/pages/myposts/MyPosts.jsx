import { useLoaderData } from "react-router-dom";
import MySinglePost from "./mySinglePost/MySinglePost";

export default function MyPosts() {
  const data = useLoaderData();
  console.log(data);
  //   const { userId } = useParams();
  //   const { user } = useContext(AuthContext);
  //   const [posts, setPosts] = useState([]);
  //   const axiosPublic = useAxiosPublic();
  //   console.log("User Check", user?.email);

  //   console.log(posts, "Posts");

  //   useEffect(() => {
  //     axiosPublic
  //       .get(`/blogs/user/${user?.email}`)
  //       .then((res) => setPosts(res.data));
  //   }, [axiosPublic]);
  return (
    <div>
      <h4>Myposts: {data?.length}</h4>
      {data.map((post) => (
        <MySinglePost post={post} key={post._id}></MySinglePost>
      ))}
    </div>
  );
}

// export default MyPosts;
