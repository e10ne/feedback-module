import { Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import {
  useCategoriesQuery,
  // useFeedbacksQuery,
} from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import Categories from "../components/admin/Categories";
import Feedbacks from "../components/admin/Feedbacks";
import Searchbar from "../components/admin/SearchBar";
import Layout from "../components/layout/Layout";

const AdminPage: React.FC<{}> = () => {
  // const [{ data: feedbacks, fetching: feedBackFetching }] = useFeedbacksQuery();
  const [{ data: categories }] = useCategoriesQuery();

  return (
    <Layout>
      <Flex
        flexDirection={"column"}
        gap={"4"}
        pb={"3em"}
      >
        <Heading variant={"pageHeader"}>Feedback beheerderpagina</Heading>

        {/* <Text>Searchbar here...</Text> */}
        <Searchbar categories={categories} />

        <Categories data={categories} />

        <Feedbacks />

        <Heading variant={"subHeader"}>Archief feedback</Heading>
        <Text>Archived feedback here...</Text>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(AdminPage);
