import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import type { User } from "../../model/User";

const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`https://some.api.provider/api/user/${userId}`);
  return response.json() as Promise<User>;
};
export const useUser = (userId: string): ReturnType<typeof useSWR<User>> => {
  return useSWR<User>(
    ["/api/user/:userId", userId],
    async ([, userId]) => fetchUser(userId),
    {
      suspense: false,
    }
  );
};

const fetchUsers = async (
  offset: number = 0,
  limit: number = 5
): Promise<User[]> => {
  return Promise.resolve(undefined as any);
};
export const useUsers = (): ReturnType<typeof useSWRInfinite<User[]>> => {
  const keyLoader: any = () => {
    //
  };
  return useSWRInfinite<User[]>(
    keyLoader,
    async () => {
      return await fetchUsers();
    },
    {
      suspense: false,
    }
  );
};
