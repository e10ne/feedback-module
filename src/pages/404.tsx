import { Button, Heading, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/layout/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";

const custom404: React.FC = () => {
  return (
    <Layout>
      <Stack
        alignItems={"center"}
        mt={"4"}
        // gap={"10"}
      >
        <Heading variant={"pageHeader"}>Deze pagina bestaat niet</Heading>
        <NextLink href={"/"}>
          <Button bgColor={"button"}>Ga terug naar de hoofdpagina</Button>
        </NextLink>
      </Stack>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(custom404);
