import { Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import Categories from "../components/admin/Categories";
import Feedbacks from "../components/admin/Feedbacks";
import Layout from "../components/layout/Layout";

const AdminPage: React.FC<{}> = () => {
  return (
    <Layout>
      <Flex
        flexDirection={"column"}
        gap={"4"}
        pb={"3em"}
      >
        <Heading variant={"pageHeader"}>Feedback beheerderpagina</Heading>

        <Text>Searchbar here...</Text>

        <Categories />

        <Feedbacks />

        <Heading variant={"subHeader"}>Archief feedback</Heading>
        <Text>Archived feedback here...</Text>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AdminPage);
