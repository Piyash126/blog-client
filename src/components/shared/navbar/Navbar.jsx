import { useContext } from "react";
import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import { AuthContext } from "../../authInfo/provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  console.log("User Info", user?.email);
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const [isAdmin] = useAdmin();
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/createPost">Create Post</Link>
      </li>
      {/* <li>
        <Link to={`/posts/blogs/${user.userId}`}>My Posts</Link>
      </li> */}
      {user && isAdmin ? (
        <>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </>
      ) : (
        <></>
      )}

      {user ? (
        <>
          <li>
            <Link to={`/myposts/user/${user.email}`}>My Posts</Link>
          </li>
          <button className="btn btn-ghost -mt-1" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Create Account</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm z-10 bg-opacity-30 bg-black sticky top-0">
      <div className="navbar-start flex-1">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl hidden md:block">
          daisyUI
        </Link>
      </div>
      <div className="navbar-center flex-1 justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full"
        />
      </div>
      <div className="navbar-end hidden lg:flex flex-1 justify-end">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
    </div>
  );
};

export default Navbar;
