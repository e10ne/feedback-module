import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMeQuery } from "../../graphql/generated/graphql";

export const useIsAuth = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [{ data, fetching, error }] = useMeQuery();
  const router = useRouter();
  const [hasCalled, setHasCalled] = useState(false);

  // console.log("data: ", data);
  // console.log("fetching: ", fetching);
  // console.log("hasCalled: ", hasCalled);
  // console.log("router: ", router.pathname);

  useEffect(() => {
    if (hasCalled) return;
    if (error) console.log("error: ", error.message);
    if (!data?.me && !fetching) {
      // console.log("no user");
      setHasCalled(true);
      router.replace("/login");
    } else if (
      !fetching &&
      data?.me?.username !== "admin" &&
      router.pathname === "/admin"
    ) {
      // console.log("not admin");
      setHasCalled(true);
      router.replace("/");
    } else if (!fetching && data?.me) {
      setIsLoading(false);
      setHasCalled(true);
      // console.log("user: ", data);
    }
  }, [data, fetching]);
};
