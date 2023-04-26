import {
  dedupExchange,
  fetchExchange,
  mapExchange,
  stringifyVariables,
} from "urql";
import { cacheExchange, Cache, Resolver } from "@urql/exchange-graphcache";
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

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(entityKey, fieldKey);
    info.partial = !isItInTheCache;
    let hasMore = true;
    let nextCursor: number | null = null;
    const results: string[] = [];

    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "feedbacks") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      const cursor = cache.resolve(key, "nextCursor") as number | null;
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      if (cursor) {
        nextCursor = cursor;
      }

      results.push(...data);
    });

    return {
      __typename: "PaginatedArchive",
      hasMore,
      nextCursor,
      feedbacks: results,
    };
  };
};

export const createUrqlClient = (ssrExchange: any) => {
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {},
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedArchive: () => null,
        },
        resolvers: {
          Query: {
            archivedFeedbacks: cursorPagination(),
          },
        },
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
            deleteCategory: (_result, args, cache, _info) => {
              invalidateCache(cache, "Category", args.id as number);
            },
          },
        },
      }),
      mapExchange({
        onError(error) {
          console.error(error);
        },
      }),
      // other synchronous exchanges
      ssrExchange,
      // other asynchronous exchanges
      fetchExchange,
    ],
  };
};
