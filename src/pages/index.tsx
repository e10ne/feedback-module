import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import NextLink from "next/link";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";

const Index: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <Stack
        mt={"10"}
        fontSize={"20"}
        color="text"
        spacing={"4"}
        fontFamily={"Open Sans"}
      >
        <Text>Welkom op de feedback module van Spectrum Multimedia & IT!</Text>
        <Text>
          Bij Spectrum Multimedia & IT hechten we veel waarde aan je mening en
          streven we ernaar om een prettige leer-/werkomgeving te leveren die
          aansluit bij jouw behoeften. We vinden dat je feedback essentieel is
          om jouw ervaring bij Spectrum Multimedia & IT te verbeteren waar nodig
          is.
        </Text>
        <Text>
          Dit platform is speciaal ontworpen voor jou, onze geweldige mediënten,
          om je gedachten, suggesties en ervaringen met ons te delen. We horen
          graag over je interacties met ons team, de kwaliteit van onze
          diensten, en eventuele ideeën die je hebt ter verbetering. Je feedback
          stelt ons in staat om voortdurend onze werkwijze te verfijnen en te
          ontwikkelen om aan jouw verwachtingen te voldoen.
        </Text>
      </Stack>
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
