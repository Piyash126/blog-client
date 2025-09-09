import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Updateblog from "../pages/blogs/updateblog/Updateblog";
import Comments from "../pages/comments/Comments";
import CreatePost from "../pages/createPost/CreatePost";
import Home from "../pages/home/home/Home";
import Login from "../pages/login/Login";
import MyPosts from "../pages/myposts/MyPosts";
import News from "../pages/news/News";
import Signup from "../pages/singup/Signup";
import AllUsers from "../pages/users/allUsers/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "news/:id",
        element: <News></News>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/blogs/${params.id}`),
      },
      {
        path: "updateblog/:id",
        element: <Updateblog></Updateblog>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/blogs/${params.id}`),
      },
      {
        path: "/users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "/createPost",
        element: <CreatePost></CreatePost>,
      },
      {
        path: "/myposts/user/:email",
        element: <MyPosts></MyPosts>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/blogs/user/${params.email}`),
      },
      {
        path: "comments",
        element: <Comments></Comments>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_baseURL}/blogs/${params.id}`),
      },
    ],
  },
]);
