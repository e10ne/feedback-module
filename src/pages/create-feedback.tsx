import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import DescriptionTextarea from "../components/form/DescriptionTextarea";
import InputText from "../components/form/InputText";
import SelectCategory from "../components/form/SelectCategory";
import Layout from "../components/layout/Layout";

const CreateFeedback: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <Heading mt={"8"}>Feedback doorgeven</Heading>
      <Text
        mt={"4"}
        mb={"5"}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <Formik
        initialValues={{ title: "", category: 0, description: "" }}
        onSubmit={() => {
          console.log("submit");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex
              flexDir={"column"}
              gap={"4"}
            >
              <InputText
                label="Titel*"
                name="title"
              />
              <SelectCategory />
              <DescriptionTextarea
                label="Omschrijving*"
                name="description"
              />
              <Text
                fontSize={"12px"}
                fontWeight={"400"}
                color={"#737373"}
              >
                Je feedback wordt anoniem opgeslagen.
              </Text>
              <Button
                type={"submit"}
                isDisabled={isSubmitting}
                bgColor={"button"}
                w={"max-content"}
                alignSelf={"flex-end"}
                px={"2em"}
                py={"1.5em"}
              >
                Verzenden
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default CreateFeedback;
