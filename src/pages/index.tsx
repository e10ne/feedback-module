import { Button, Flex, Text } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import NextLink from "next/link";
import { useMeQuery } from "../../graphql/generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";

const Index = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  if (!fetching && !data?.me) {
    router.push("/login");
  }

  if (!data?.me) return null;

  return (
    <Layout>
      <Text color="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <Flex
        justify={"center"}
        mt={"20"}
      >
        <NextLink href={"/create-feedback"}>
          <Button
            bgColor={"button"}
            alignSelf={"flex-end"}
            fontSize={"36px"}
            size={"lg"}
            px={"14"}
            py={"10"}
          >
            Geef Feedback
          </Button>
        </NextLink>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
