import { Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

const custom404: React.FC = () => {
  return (
    <Stack
      alignItems={"center"}
      mt={"4"}
    >
      <Heading>Pagina niet gevonden</Heading>
      <Link
        as={NextLink}
        href={"/"}
        color={"teal.600"}
      >
        terug naar hoofdpagina
      </Link>
    </Stack>
  );
};

export default custom404;
