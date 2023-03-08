import { dedupExchange, errorExchange, fetchExchange } from "urql";
import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import { ArchiveFeedbackMutationVariables } from "../graphql/generated/graphql";

const invalidateCache = (cache: Cache, name: string, id?: number) => {
  id
    ? cache.invalidate({ __typename: name, id: id })
    : cache
        .inspectFields("Query")
        .filter((field) => field.fieldName === name)
        .forEach((field) => {
          cache.invalidate("Query", field.fieldKey);
        });
};

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {},
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {},
        resolvers: {},
        updates: {
          Mutation: {
            createCategory: (_result, _args, cache, _info) => {
              invalidateCache(cache, "categories");
            },
            archiveFeedback: (_result, args, cache, _info) => {
              invalidateCache(
                cache,
                "Feedback",
                (args as ArchiveFeedbackMutationVariables).id
              );
            },
          },
        },
      }),
      errorExchange({}),
      ssrExchange,
      fetchExchange,
    ],
  };
};
