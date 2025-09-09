import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaComment } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useBlog from "../../../hooks/useBlog";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../authInfo/provider/AuthProvider";

const Comments = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  console.log("User Image link", user?.photoURL);
  // const [blogsall] = useBlog();
  const blogData = useLoaderData();
  // console.log(blogData?._id);

  // console.log("Blog table data", blogsall);
  const axiosPublic = useAxiosPublic();

  const { data: comments = [], refetch } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/comments/${blogData?._id}`);
      return res.data;
    },
  });
  console.log("User Email", user?.email);
  const onSubmit = async (data) => {
    const commentItem = {
      bblogId: blogData?._id,
      userEmail: user?.email,
      comment: data.comment,
      createdAt: new Date(),
    };

    // data send to the database
    const commentRes = await axiosPublic.post("/comments", commentItem);
    console.log(commentRes.data);
    if (commentRes.data.insertedId) {
      // show success popup
      reset();
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.title} is  added successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-5/8">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">
          Comments for blog {blogData?._id}
        </h2>

        {/* Comment List */}
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c._id} className="flex items-start gap-3">
              {/* Avatar */}

              <img
                src={`https://i.pravatar.cc/40?u=${c.userEmail}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              {/* Comment Body */}
              <div className="bg-gray-100 px-4 py-2 rounded-2xl max-w-md">
                <p className="font-semibold text-sm">{c.userEmail}</p>
                <p className="text-gray-800">{c.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input box */}
      <h2 className="text-lg font-semibold mb-2">Please give your opinion</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-2">
          {/* Logged in user avatar */}
          <img
            src={user?.photoURL || "/public/profile.jpg"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Write a comment..."
            {...register("comment", { required: true })}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            <FaComment className="inline mr-1" /> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
