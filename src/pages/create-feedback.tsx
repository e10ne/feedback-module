import { Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useCategoriesQuery } from "../../graphql/generated/graphql";
import { useCreateFeedbackMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import DescriptionTextarea from "../components/form/DescriptionTextarea";
import InputText from "../components/form/InputText";
import SelectCategory from "../components/form/SelectCategory";
import SubmitModal from "../components/form/SubmitModal";
import Layout from "../components/layout/Layout";
import { feedbackValidation } from "../utils/validation";
import { useState } from "react";
import { useIsAuth } from "../utils/useIsAuth";

const CreateFeedback: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [{ data: categoriesData, fetching: categoriesFetching }] =
    useCategoriesQuery({ requestPolicy: "cache-and-network" });
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

  useIsAuth(setIsLoading);

  return (
    <Layout>
      {!isLoading && (
        <>
          <Heading
            mt={"8"}
            size={"lg"}
          >
            Feedback doorgeven
          </Heading>
          <Text
            mt={"10"}
            fontSize={"20"}
            fontFamily={"Open Sans"}
          >
            Of je nu lof, opbouwende kritiek of specifieke verzoeken hebt, we
            moedigen je aan om deze pagina te gebruiken om je gedachten open en
            eerlijk te uiten. Je feedback wordt met de grootste aandacht
            behandeld en speelt een cruciale rol in het vormgeven van de
            toekomst van Spectrum Multimedia & IT.
            <br />
            Vul het formulier zo volledig mogelijk in. Het invullen is anoniem,
            maar wanneer je feedback specifiek gericht is op jouw behoeften
            alleen, vragen we je om je naam erbij te vermelden.
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
                  mb={"4"}
                  color={"#252B42"}
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
