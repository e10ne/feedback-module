import { Flex, Heading } from "@chakra-ui/react";
import NextImage from "next/image";
import HeaderMenu from "./HeaderMenu";
import logo from "/public/logo.svg";

const Header: React.FC<{}> = ({}) => {
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
      <HeaderMenu />
    </Flex>
  );
};

export default Header;
