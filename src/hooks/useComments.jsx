// import React from 'react';
// import useAxiosPublic from './useAxiosPublic';

// const useComments = () => {
//     const axiosPublic=useAxiosPublic();

//       const { data: comments = [], refetch } = useQuery({
//     queryKey: ["comments", id],
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/comments/${id}`);
//       return res.data;
//     },
//   });
// };

// export default useComments;
