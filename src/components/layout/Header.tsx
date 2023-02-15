import { Flex, Heading } from "@chakra-ui/react";
import NextImage from "next/image";
import HeaderButton from "./HeaderButton";
import logo from "/public/logo.svg";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"space-between"}
      py={"1em"}
      px={"2em"}
      bgColor={"headerBackground"}
    >
      <Flex
        gap={"2em"}
        alignItems={"center"}
      >
        <NextImage
          alt=""
          src={logo}
          title=""
        />
        <Heading
          size={"md"}
          color={"white"}
        >
          Feedback module Spectrum Multimedia & IT
        </Heading>
      </Flex>
      <HeaderButton />
    </Flex>
  );
};

export default Header;
