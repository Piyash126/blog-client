import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlog = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: blogsall = [] } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blogs");
      return res.data;
    },
  });
  return [blogsall, refetch];
};

export default useBlog;
