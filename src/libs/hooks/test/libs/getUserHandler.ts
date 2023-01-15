import { rest } from "msw";
import { User } from "../../../../model/User";
import { getMockUser } from "./getMockUser";
export const getUserHandler = () => {
  return rest.get<User, { userId: string }>(
    "https://some.api.provider/api/user/:userId",
    (req, res, ctx) => {
      const { userId } = req.params;
      return res(
        ctx.status(200),
        ctx.json(getMockUser({ id: parseInt(userId, 10) }))
      );
    }
  );
};
