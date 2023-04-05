import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import InputText from "../components/form/InputText";
import Layout from "../components/layout/Layout";

const LoginPage: React.FC<{}> = () => {
  return (
    <Layout>
      <Formik
        initialValues={{ userName: "", password: "" }}
        onSubmit={(values) => {
          console.log("values: ", values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex
              flexDir={"column"}
              w={"60%"}
              mx={"auto"}
              gap={"4"}
            >
              <InputText
                label="Naam"
                name="userName"
              />
              <InputText
                label="Wachtwoord"
                name="password"
                type={"password"}
              />
              <Button
                mt={"5"}
                alignSelf={"flex-end"}
                bgColor={"button"}
                w={"max-content"}
                type={"submit"}
                disabled={isSubmitting}
              >
                Inloggen
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(LoginPage);
