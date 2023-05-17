import { Dispatch, SetStateAction, useEffect } from "react";
import { useMeQuery } from "../../graphql/generated/graphql";

export const currentUser = async (
  setUser: Dispatch<SetStateAction<string | undefined>>,
  setFetching?: Dispatch<SetStateAction<boolean>>
) => {
  const [{ fetching, data }] = useMeQuery();

  useEffect(() => {
    // console.log("data: ", data);
    if (setFetching) {
      setFetching(fetching);
    }
    if (!fetching) {
      setUser(data?.me?.username);
    }
  }, [data, fetching]);

  return fetching;
};
