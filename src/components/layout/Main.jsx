import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";

const Main = () => {
  const location = useLocation();
  // console.log(location);
  const noHeaderFooter = location.pathname.includes("/news");
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
