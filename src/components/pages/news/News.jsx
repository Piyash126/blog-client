import { Link, useLoaderData } from "react-router-dom";
import CommentSection from "../comments/Comments";

const News = () => {
  const { image, details, title } = useLoaderData();
  //   console.log(data);
  //   const news = data.data[0];
  //   console.log(news);
  // console.log(image);

  return (
    <div>
      <main className="w-11/12 mx-auto grid grid-cols-12 gap-5">
        <section className="col-span-12">
          <h2 className="font-semibold mb-3">Dragon News</h2>
          <div className="card bg-base-100 shadow-sm">
            <figure>
              <img src={image} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p>{details}</p>
              {/* <div className="card-actions justify-end">
                <Link
                  to={`/category/${news?.category_id}`}
                  className="btn btn-primary"
                >
                  Back to category
                </Link>
              </div> */}

              <div className="card-actions justify-end">
                <Link to="/" className="btn btn-primary">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="w-3/6 my-5">
        <h1 className="text-green-600 my-4">
          See the all comments for this item:
        </h1>
        <CommentSection></CommentSection>
      </div>
    </div>
  );
};

export default News;
