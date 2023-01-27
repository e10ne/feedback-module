import { Flex, Heading, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
// import { useCreateFeedbackMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import DescriptionTextarea from "../components/form/DescriptionTextarea";
import InputText from "../components/form/InputText";
import SelectCategory from "../components/form/SelectCategory";
import SubmitModal from "../components/form/SubmitModal";
import Layout from "../components/layout/Layout";
import { feedbackValidation } from "../utils/validation";

const CreateFeedback: React.FC<{}> = ({}) => {
  // const [, createFeedback] = useCreateFeedbackMutation()
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
        initialValues={{
          title: "",
          category_name: "",
          description: "",
        }}
        validate={(values) => feedbackValidation(values)}
        onSubmit={async (values) => {
          console.log(values);
          // await createFeedback()
        }}
      >
        {({ values, handleSubmit, validateForm }) => (
          <Form>
            <Flex
              flexDir={"column"}
              gap={"4"}
            >
              <InputText
                label="Titel*"
                name="title"
              />
              <SelectCategory
                name="category_name"
                label="Categorie*"
              />
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
              <SubmitModal
                values={values}
                handleSubmit={handleSubmit}
                validateForm={validateForm}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateFeedback);
