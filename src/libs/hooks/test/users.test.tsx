import { describe, beforeAll, afterAll, it, expect } from "vitest";
import { setupServer } from "msw/node";
import { act, renderHook } from "@testing-library/react";
import { useUser, useUsers } from "../users";
import { sleep } from "../../sleep";
import { getUserHandler } from "./libs/getUserHandler";
import { getMockUser } from "./libs/getMockUser";
import { Wrapper } from "./libs/Wrapper";

const mockServer = setupServer(getUserHandler());

describe("libs/hooks/users", () => {
  beforeAll(() => {
    mockServer.listen();
  });
  afterAll(() => {
    mockServer.close();
  });

  it("fetch a user", async () => {
    const { result } = renderHook(() => useUser("100"), {
      wrapper: Wrapper,
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBeTruthy();

    await act(sleep);

    expect(result.current.data).toBeDefined();
    expect(result.current.isLoading).toBeFalsy();

    expect(result.current.data).toEqual(getMockUser({ id: 100 }));
  });

  it("fetch user list", async () => {
    const { result } = renderHook(() => useUsers(), {
      wrapper: Wrapper,
    });

    expect(result.current.isLoading).toBeTruthy();

    await act(sleep);

    expect(result.current.data?.list).toHaveLength(5);
    expect(result.current.isLoading).toBeFalsy();

    await act(result.current.fetchNext);

    expect(result.current.data?.list).toHaveLength(5);

    await act(sleep);

    expect(result.current.data?.list).toHaveLength(10);
  });
});
