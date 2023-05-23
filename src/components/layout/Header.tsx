import { Flex, Heading } from "@chakra-ui/react";
import NextImage from "next/image";
import { MeQuery } from "../../../graphql/generated/graphql";
import HeaderMenu from "./HeaderMenu";
import logo from "/public/logo.svg";

interface HeaderProps {
  data: MeQuery | undefined;
  fetching: boolean;
}

const Header: React.FC<HeaderProps> = ({ data, fetching }) => {
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
      <HeaderMenu
        data={data}
        fetching={fetching}
      />
    </Flex>
  );
};

export default Header;
