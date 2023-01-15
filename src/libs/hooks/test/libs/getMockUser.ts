import { User } from "../../../../model/User";

export const getMockUser = (params: Partial<User> = {}): User => {
  return {
    id: 0,
    name: "jack",
    ...params,
  };
};
