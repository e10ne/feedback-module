import { FaFileDownload } from "react-icons/fa";
import { Box, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { useCategoriesQuery } from "../../../graphql/generated/graphql";
import EditCategory from "./category/EditCategory";
import CreateCategory from "./category/CreateCategory";

const Categories: React.FC<{}> = () => {
  const [{ data, fetching, error }] = useCategoriesQuery();

  if (error) {
    console.log("error: ", error.message);
  }

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading variant={"subHeader"}>Categorieën</Heading>
        <CreateCategory />
      </Flex>
      {!data && fetching ? (
        <Box>Loading...</Box>
      ) : (
        <Stack spacing={"4"}>
          {data?.allCategories?.map((cat) =>
            !cat ? null : (
              <Flex
                key={`${cat.id}${cat.title}`}
                bgColor={"adminWhite"}
                color={"primary"}
                justifyContent={"space-between"}
                p={"4"}
              >
                <Text
                  alignSelf={"center"}
                  fontFamily={"montserrat"}
                  fontWeight={"600"}
                  fontSize={"md"}
                >
                  {cat.title}
                </Text>
                <Flex gap={"4"}>
                  <IconButton
                    aria-label="Exporteren naar pdf"
                    icon={<FaFileDownload />}
                    bgColor={"adminWhite"}
                    fontSize={"2xl"}
                    p={"4"}
                  />
                  <EditCategory
                    id={cat.id}
                    title={cat.title as string}
                  />
                </Flex>
              </Flex>
            )
          )}
        </Stack>
      )}
    </>
  );
};

export default Categories;
