import { FaFileDownload } from "react-icons/fa";
import { Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import EditCategory from "./category/EditCategory";
import CreateCategory from "./category/CreateCategory";
import { CategoriesQuery } from "../../../graphql/generated/graphql";
import NextLink from "next/link";

interface CategoriesProps {
  data: CategoriesQuery | undefined;
}

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading variant={"subHeader"}>Categorieën</Heading>
        <CreateCategory />
      </Flex>
      <Stack spacing={"1"}>
        {data?.categories?.map((cat) =>
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
                {cat.active_feedbacks && (
                  <NextLink
                    href={`/admin/category/${cat.id}`}
                    target="_blank"
                  >
                    <IconButton
                      aria-label="Naar pdf pagina"
                      icon={<FaFileDownload />}
                      bgColor={"adminWhite"}
                      fontSize={"2xl"}
                      p={4}
                    />
                  </NextLink>
                )}

                <EditCategory
                  id={cat.id}
                  title={cat.title as string}
                  hasActive={cat.active_feedbacks as boolean}
                />
              </Flex>
            </Flex>
          )
        )}
      </Stack>
    </>
  );
};

export default Categories;
