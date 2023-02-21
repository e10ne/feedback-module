import { Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import Categories from "../components/admin/Categories";
import Layout from "../components/layout/Layout";

const AdminPage: React.FC<{}> = () => {
  return (
    <Layout>
      <Heading variant={"pageHeader"}>Feedback beheerderpagina</Heading>

      <Text>Searchbar here...</Text>

      <Categories />

      <Heading variant={"subHeader"}>Feedback</Heading>
      <Text>Feedback here...</Text>

      <Heading variant={"subHeader"}>Archief feedback</Heading>
      <Text>Archived feedback here...</Text>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(AdminPage);
