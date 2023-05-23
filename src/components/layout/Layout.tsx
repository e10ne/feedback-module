import { Flex } from "@chakra-ui/react";
import { MeQuery } from "../../../graphql/generated/graphql";
import Header from "./Header";
import Wrapper from "./Wrapper";

interface LayoutProps {
  children: React.ReactNode;
  fetching: boolean;
  data: MeQuery | undefined;
}

const Layout: React.FC<LayoutProps> = ({ children, data, fetching }) => {
  return (
    <Flex
      flexDirection={"column"}
      bgColor={"mainBackground"}
      minH={"100vh"}
    >
      <Header
        fetching={fetching}
        data={data}
      />
      <Wrapper>{children}</Wrapper>
    </Flex>
  );
};

export default Layout;
