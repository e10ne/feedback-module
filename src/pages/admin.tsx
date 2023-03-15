import { Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import {
  useCategoriesQuery,
  useFeedbacksQuery,
} from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import Categories from "../components/admin/Categories";
import Feedbacks from "../components/admin/Feedbacks";
import Searchbar from "../components/admin/SearchBar";
import Layout from "../components/layout/Layout";

const AdminPage: React.FC<{}> = () => {
  const [
    { data: feedbacks, fetching: feedBackFetching, error: feedBackError },
  ] = useFeedbacksQuery();
  const [{ data: categories }] = useCategoriesQuery();
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <Layout>
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

        <Categories data={categories} />

        <Feedbacks
          searchResult={searchResult}
          data={feedbacks}
          error={feedBackError}
          fetching={feedBackFetching}
          hasSearched={hasSearched}
        />

        <Heading variant={"subHeader"}>Archief feedback</Heading>
        <Text>Archived feedback here...</Text>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(AdminPage);
