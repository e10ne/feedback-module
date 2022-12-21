import { Flex } from "@chakra-ui/react";
import Header from "./Header";
import Wrapper from "./Wrapper";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      flexDirection={"column"}
      bgColor={"mainBackground"}
      h={"100vh"}
    >
      <Header />
      <Wrapper>{children}</Wrapper>
    </Flex>
  );
};

export default Layout;
