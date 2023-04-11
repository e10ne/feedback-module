import { Alert, AlertIcon, AlertTitle, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { useLoginMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import InputText from "../components/form/InputText";
import Layout from "../components/layout/Layout";
import { loginValidation } from "../utils/validation";

const LoginPage: React.FC<{}> = () => {
  const [, login] = useLoginMutation();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  return (
    <Layout>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => loginValidation(values.userName, values.password)}
        onSubmit={async (values) => {
          const response = await login({
            name: values.userName,
            password: values.password,
          });

          if (!response.data?.login) {
            setInvalidCredentials(true);
          } else {
            setInvalidCredentials(false);

            if (response.data.login.username === "medient") {
              console.log("Dit is een medient");
              // router redirect to create-feedback
            } else if (response.data.login.username === "admin") {
              console.log("Dit is een admin");
              // router redirect to admin
            }
          }
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
              {invalidCredentials && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>gebruikersnaam/wachtwoord incorrect</AlertTitle>
                </Alert>
              )}
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
