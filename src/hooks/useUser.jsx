import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/authInfo/provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const useUser = () => {
  const { user } = useContext(AuthContext); // firebase login user
  const axiosPublic = useAxiosPublic();
  const [dbUser, setDbUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setDbUser(res.data); // এখানে আসবে mongodb user info (with _id)
      });
    }
  }, [user, axiosPublic]);

  return dbUser;
};

export default useUser;
