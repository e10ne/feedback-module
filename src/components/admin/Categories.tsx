import { FaFileDownload } from "react-icons/fa";
import { Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import EditCategory from "./category/EditCategory";
import CreateCategory from "./category/CreateCategory";
import {
  CategoriesQuery,
  FeedbacksQuery,
} from "../../../graphql/generated/graphql";

interface CategoriesProps {
  data: CategoriesQuery | undefined;
  feedbacks: FeedbacksQuery | undefined;
}

const Categories: React.FC<CategoriesProps> = ({ data, feedbacks }) => {
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
                <IconButton
                  aria-label="Exporteren naar pdf"
                  icon={<FaFileDownload />}
                  bgColor={"adminWhite"}
                  fontSize={"2xl"}
                  p={"4"}
                  onClick={() => console.log("feedbacks: ", feedbacks)}
                />
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
