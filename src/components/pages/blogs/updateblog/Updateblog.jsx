import { useForm } from "react-hook-form";
import { FaNewspaper } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Updateblog = () => {
  const { _id, author, title, category, details, excerpt } = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // console.log(_id);
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
      const menuItem = {
        author: data.author,
        title: data.title,
        category: data.category,
        details: data.details,
        excerpt: data.excerpt,
        image: res.data.data.display_url,
      };

      // data send to the database
      const menuRes = await axiosSecure.patch(`/blogs/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.author} is Updated successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    }
    console.log(res.data);
  };
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
            defaultValue={author}
            placeholder="Type here"
            {...register("author", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Title</span>
          </label>

          <input
            type="text"
            defaultValue={title}
            placeholder="Type here"
            {...register("title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Category Name</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
            defaultValue={category}
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
            defaultValue={details}
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
            defaultValue={excerpt}
            {...register("excerpt")}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Excerpt"
          ></textarea>
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            className="file-input w-full"
            {...register("image", { required: true })}
          />
        </div>

        <button className="btn mt-3">
          Add Blog <FaNewspaper></FaNewspaper>
        </button>
      </form>
    </div>
  );
};

export default Updateblog;
