import { Alert, AlertIcon, AlertTitle, Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { useLoginMutation } from "../../graphql/generated/graphql";
import { createUrqlClient } from "../../lib/createUrqlClient";
import InputText from "../components/form/InputText";
import Layout from "../components/layout/Layout";
import { loginValidation } from "../utils/validation";
import { useRouter } from "next/router";

const LoginPage: React.FC<{}> = () => {
  const [, login] = useLoginMutation();
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const router = useRouter();
  return (
    <Layout>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => loginValidation(values.userName, values.password)}
        onSubmit={async (values) => {
          const { data: response } = await login({
            name: values.userName,
            password: values.password,
          });

          if (!response?.login) {
            setInvalidCredentials(true);
          } else {
            setInvalidCredentials(false);

            if (response.login.username === "medient") {
              router.replace("/create-feedback");
            } else if (response.login.username === "admin") {
              router.replace("/admin");
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
