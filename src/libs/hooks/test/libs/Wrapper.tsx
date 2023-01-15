import { SWRConfig } from "swr";
export const Wrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <SWRConfig
      value={{
        // Clearing cache between cases
        provider: () => new Map(),
      }}
    >
      {props.children};
    </SWRConfig>
  );
};
