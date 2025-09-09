import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

const Latest = () => {
  return (
    <div className="mt-5">
      <div className="flex gap-2 items-center bg-base-200 p-2">
        <p className="bg-[#D72050] text-base-100 px-8 py-2 rounded-md">
          Latest
        </p>
        <Marquee pauseOnHover={true} speed={50} className="space-x-10">
          <Link to="/news">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestiae sequi eveniet aperiam dolorum harum.
          </Link>
          <Link to="/news">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestiae sequi eveniet aperiam dolorum harum.
          </Link>
          <Link to="/news">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestiae sequi eveniet aperiam dolorum harum.
          </Link>
          <Link to="/news">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestiae sequi eveniet aperiam dolorum harum.
          </Link>
        </Marquee>
      </div>
    </div>
  );
};

export default Latest;
