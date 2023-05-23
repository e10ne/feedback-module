import { Flex, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useCategoriesQuery,
  useFeedbacksQuery,
} from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import Archived from "../components/admin/Archived";
import Categories from "../components/admin/Categories";
import Feedbacks from "../components/admin/Feedbacks";
import Searchbar from "../components/admin/SearchBar";
import Layout from "../components/layout/Layout";
import { isServer } from "../utils/isServer";
import { PageProps } from "../utils/pageProps";

const AdminPage: React.FC<PageProps> = ({
  data: meData,
  fetching: meFetching,
}) => {
  // const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const router = useRouter();

  const [
    { data: feedbacks, fetching: feedBackFetching, error: feedBackError },
  ] = useFeedbacksQuery();
  const [{ data: categories }] = useCategoriesQuery();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  if (!meFetching && !meData?.me && !isServer()) {
    router.push("/login");
  }

  if (!meFetching && meData?.me?.username !== "admin" && !isServer()) {
    router.push("/");
  }

  return (
    <Layout
      data={meData}
      fetching={meFetching}
    >
      {!meFetching && meData?.me?.username === "admin" && (
        <Flex
          flexDirection={"column"}
          gap={"4"}
          pb={"3em"}
        >
          <Heading variant={"pageHeader"}>Feedback beheerderpagina</Heading>

          <Searchbar
            setHasSearched={setHasSearched}
            categories={categories}
            feedbacks={feedbacks}
            setSearchResult={setSearchResult}
          />

          <Categories
            data={categories}
            feedbacks={feedbacks}
          />

          <Feedbacks
            searchResult={searchResult}
            data={feedbacks}
            error={feedBackError}
            fetching={feedBackFetching}
            hasSearched={hasSearched}
            setSearchResult={setSearchResult}
            setHasSearched={setHasSearched}
          />

          <Heading variant={"subHeader"}>Archief feedback</Heading>
          <Archived />
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(AdminPage);
