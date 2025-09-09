import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaNewspaper } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../authInfo/provider/AuthProvider";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // const dbUser = useUser();
  // console.log("user Id", dbUser?._id);
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image
      const postItem = {
        userEmail: user?.email,
        name: data.author_name,
        title: data.title,
        image: res.data.data.display_url,
        date: data.date,
        category: data.category,
        details: data.details,
        tags: data.tags,
        excerpt: data.excerpt,
        rating: data.rating,
        views: data.views,
      };

      // data send to the database
      const menuRes = await axiosSecure.post("/blogs", postItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.title} is  added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log(res.data);
  };
  //   const { user } = useContext(AuthContext);
  return (
    <div>
      <h2 className="text-3xl">Post a new job</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Author Name</span>
          </label>

          <input
            type="text"
            placeholder="Type here"
            {...register("author_name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Title</span>
          </label>

          <input
            type="text"
            placeholder="Type here"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-1/2 ">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              className="file-input w-full"
              {...register("image", { required: true })}
            />
          </div>

          <div className="form-control w-full md:w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              placeholder="Type here"
              {...register("date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
            defaultValue="default"
          >
            <option disabled value="default">
              Select a Category
            </option>
            <option value="Politics">Politics</option>
            <option value="Technology">Technology</option>
            <option value="Environment">Environment</option>
            <option value="Sports">Sports</option>
            <option value="Art & Culture">Art & Culture</option>
          </select>
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">News Details</span>
          </label>

          <textarea
            {...register("details")}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Bio"
          ></textarea>
        </div>
        {/* <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <input
            {...register("tags")}
            className="textarea textarea-bordered w-full"
            placeholder="Put each requirement on a new line"
            name="tags"
            // rows={5}
            required
          ></input>
        </div> */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Excerpt</span>
          </label>

          <textarea
            {...register("excerpt")}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Excerpt"
          ></textarea>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Rating</span>
            </label>

            <input
              {...register("rating")}
              className="input input-bordered w-full"
              placeholder="Rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="form-control w-1/2">
            <label className="label">
              <span className="label-text">Views</span>
            </label>

            <input
              {...register("views")}
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Views"
              type="number"
            ></input>
          </div>
        </div>

        <button className="btn mt-3">
          Add Blog <FaNewspaper></FaNewspaper>
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
