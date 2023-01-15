import useSWR from "swr";
import type { User } from "../../model/User";

const fetchUser = async (userId: string): Promise<User> => {
  return Promise.resolve({} as any);
};
type R = typeof useSWR<User>;
export const useUser = (userId: string): ReturnType<R> => {
  return useSWR<User>(
    ["/api/user/:userId", userId],
    async ([, userId]) => fetchUser(userId),
    {
      suspense: false,
    }
  );
};
