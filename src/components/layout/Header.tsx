import { Flex, Heading } from "@chakra-ui/react";
import HeaderButton from "./HeaderButton";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      py={"1em"}
      px={"2em"}
      bgColor={"#3f5e7e"}
    >
      <Heading
        size={"md"}
        color={"white"}
      >
        {/* Icon */}
        Feedback module Spectrum Multimedia & IT
      </Heading>
      <HeaderButton />
    </Flex>
  );
};

export default Header;
