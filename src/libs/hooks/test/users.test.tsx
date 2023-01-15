import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useUser } from "../users";
import { sleep } from "../../sleep";
import { getMockUser } from "./libs/getMockUser";
import { Wrapper } from "./libs/Wrapper";

describe("libs/hooks/users", () => {
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
});
