import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMeQuery } from "../../graphql/generated/graphql";
import { useRouter } from "next/router";

export const useIsAuth = (setIsLoading: Dispatch<SetStateAction<boolean>>) => {
  const [{ fetching, data }] = useMeQuery();
  const [hasCalled, setHasCalled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (hasCalled) return;

    if (!fetching && !data?.me?.username) {
      setHasCalled(true);
      router.replace("/login");
    } else if (
      !fetching &&
      data?.me?.username !== "admin" &&
      router.pathname.startsWith("/admin")
    ) {
      setHasCalled(true);
      router.replace("/");
    } else if (!fetching && data?.me?.username) {
      setIsLoading(false);
      setHasCalled(true);
    }
  }, [data, fetching]);
};
