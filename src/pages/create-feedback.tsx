import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import {
  useCategoriesQuery,
  useMeQuery,
} from "../../graphql/generated/graphql";
import { useCreateFeedbackMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import DescriptionTextarea from "../components/form/DescriptionTextarea";
import InputText from "../components/form/InputText";
import SelectCategory from "../components/form/SelectCategory";
import SubmitModal from "../components/form/SubmitModal";
import Layout from "../components/layout/Layout";
import { feedbackValidation } from "../utils/validation";

const CreateFeedback: React.FC<{}> = ({}) => {
  const [{ data: meData, fetching: meFetching }] = useMeQuery();
  const router = useRouter();

  const [{ data: categoriesData, fetching: categoriesFetching }] =
    useCategoriesQuery();
  const [, createFeedback] = useCreateFeedbackMutation();
  const toast = useToast({
    title: "Success",
    description: "Bedankt voor de feedback",
    status: "success",
    isClosable: true,
    duration: 5000,
    containerStyle: {
      width: "max-content",
    },
  });

  if (!meFetching && !meData?.me) {
    router.push("/login");
  }

  return (
    <Layout>
      {!meFetching && meData?.me?.username && (
        <>
          <Heading
            mt={"8"}
            size={"lg"}
          >
            Feedback doorgeven
          </Heading>
          <Text
            mt={"6"}
            fontSize={"lg"}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Formik
            validateOnChange={false}
            validateOnBlur={false}
            initialValues={{
              title: "",
              category_id: "",
              description: "",
            }}
            validate={(values) => feedbackValidation(values)}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              const { error } = await createFeedback({
                categoryId: parseInt(values.category_id),
                title: values.title,
                description: values.description,
              });

              if (!error) {
                console.log("Success");
                resetForm();
                toast();
              }
            }}
          >
            {({ values, handleSubmit, validateForm }) => (
              <Form>
                <Flex
                  mt={"10"}
                  flexDir={"column"}
                  gap={"4"}
                >
                  <InputText
                    label="Titel*"
                    name="title"
                  />
                  <SelectCategory
                    name="category_id"
                    label="Categorie*"
                    categories={categoriesData}
                    fetching={categoriesFetching}
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
                    categories={categoriesData}
                    handleSubmit={handleSubmit}
                    validateForm={validateForm}
                  />
                </Flex>
              </Form>
            )}
          </Formik>
        </>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreateFeedback);
