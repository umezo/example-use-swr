import { rest } from "msw";
import { User } from "../../../../model/User";
import { getMockUser } from "./getMockUser";
export const getUsersHandler = (totalCount: number = 15) => {
  return rest.get<User[], { userId: string }>(
    "https://some.api.provider/api/user",
    (req, res, ctx) => {
      req.url.searchParams.get("offset");
      const offset = parseInt(req.url.searchParams.get("offset") ?? "0", 10);
      const limit = parseInt(req.url.searchParams.get("limit") ?? "0", 10);

      return res(
        ctx.status(200),
        ctx.json({
          list: new Array(limit)
            .fill(0)
            .map((_, index) => getMockUser({ id: offset + index })),
          nextOffset: offset + limit,
          hasNext: offset + limit <= totalCount,
        })
      );
    }
  );
};
