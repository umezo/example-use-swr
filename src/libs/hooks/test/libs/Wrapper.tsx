import { SWRConfig } from "swr";
export const createWrapper = (
  cache: Map
): React.FC<{ children: React.ReactNode }> => {
  return (props) => (
    <SWRConfig
      value={{
        // Clearing cache between cases
        provider: () => cache,
      }}
    >
      {props.children};
    </SWRConfig>
  );
};

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
