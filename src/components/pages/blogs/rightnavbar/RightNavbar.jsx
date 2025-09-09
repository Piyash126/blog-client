import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const RightNavbar = () => {
  const axiosPublic = useAxiosPublic();
  const { data: usersData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        "/users"
        //     {
        //     headers: {
        //       authorization: `Bearer ${localStorage.getItem("access-token")}`,
        //     },
        //   }
      );
      return res.data;
    },
  });
  const limitUsers = usersData.slice(0, 10);
  console.log(limitUsers);
  return (
    <div>
      <h2 className="font-semibold mb-3">Total Users: ({limitUsers.length})</h2>

      <div className="flex flex-col gap-2">
        {limitUsers.map((user) => (
          <h4 className="btn bg-base-100 border-none">{user.name}</h4>
        ))}
      </div>
      {usersData.length > 10 && (
        <div className="mt-4 flex items-center justify-center text-center">
          <Link to="/users">
            <button className="btn btn-primary">See All Users</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default RightNavbar;
