import React from "react";
import useSWR, { useSWRConfig } from "swr";
import useSWRInfinite from "swr/infinite";
import type { User } from "../../model/User";

const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`https://some.api.provider/api/user/${userId}`);
  return response.json() as Promise<User>;
};
const useMutateUser = () => {
  const { mutate } = useSWRConfig();

  return React.useCallback(
    (user: User) => {
      mutate(["/api/user/:userId", user.id], user, { revalidate: false });
    },
    [mutate]
  );
};
export const useUser = (
  userId: User["id"]
): ReturnType<typeof useSWR<User>> => {
  return useSWR<User>(
    ["/api/user/:userId", userId],
    async ([, userId]) => fetchUser(userId),
    {
      suspense: false,
    }
  );
};

type UserListResponse = {
  list: User[];
  nextOffset: number;
  hasNext: boolean;
};
const fetchUsers = async (
  offset: number = 0,
  limit: number = 5
): Promise<UserListResponse> => {
  const response = await fetch(
    `https://some.api.provider/api/user?limit=${limit}&offset=${offset}`
  );
  return response.json() as Promise<UserListResponse>;
};
export const useUsers = (
  limit: number = 5
): {
  data: { list: User[] } | undefined;
  isLoading: boolean;
  fetchNext(): Promise<void>;
} => {
  const mutateUser = useMutateUser();
  const keyLoader: SWRInfiniteKeyLoader<{
    key: string;
    offset: number;
    limit: number;
  }> = (pageIndex: number, previousPage: UserListResponse) => {
    if (pageIndex === 0) {
      return {
        key: "/api/users",
        offset: 0,
        limit,
      };
    } else if (previousPage.hasNext) {
      return {
        key: "/api/users",
        offset: previousPage.nextOffset,
        limit,
      };
    } else {
      return null;
    }
  };

  const { isLoading, data, setSize } = useSWRInfinite<UserListResponse>(
    keyLoader,
    async ({ limit, offset }: Exclude<ReturnType<typeof keyLoader>, null>) => {
      const response = await fetchUsers(offset, limit);
      response.list.forEach(mutateUser);
      return response;
    },
    {
      suspense: false,
    }
  );

  const fetchNext = React.useCallback(async () => {
    await setSize((size) => size + 1);
  }, [setSize]);

  const returnData = React.useMemo(() => {
    return data === undefined
      ? undefined
      : {
          list: data.flatMap((page) => page.list),
        };
  }, [data]);

  return {
    data: returnData,
    fetchNext,
    isLoading,
  };
};
