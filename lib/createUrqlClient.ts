import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {},
    exchanges: [
      dedupExchange,
      cacheExchange({}),
      errorExchange({}),
      ssrExchange,
      fetchExchange,
    ],
  };
};
