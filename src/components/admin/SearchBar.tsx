import { Flex, IconButton, Input, Select } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useCategoriesQuery } from "../../../graphql/generated/graphql";
import { SearchIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";
import { feedbackVars } from "../../pages/admin";

interface SearchBarProps {
  setFeedbackVariables: Dispatch<SetStateAction<feedbackVars>>;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
}

const Searchbar: React.FC<SearchBarProps> = ({
  setFeedbackVariables,
  setHasSearched,
}) => {
  const [{ data }] = useCategoriesQuery();
  return (
    <>
      <Formik
        initialValues={{
          text: "",
          categoryId: "",
        }}
        onSubmit={async (values) => {
          const catId = parseInt(values.categoryId);
          setFeedbackVariables({
            categoryId: catId,
            text: values.text,
          });
          setHasSearched(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex>
              <Field
                as={Input}
                placeholder="Titel van feedback"
                name="text"
                _placeholder={{
                  fontFamily: "Montserrat",
                  fontWeight: "400",
                }}
                border={"1px solid #E6E6E6"}
                bg={"adminWhite"}
                h={"60px"}
              />
              <Field
                as={Select}
                name="categoryId"
                fontFamily={"Montserrat"}
                fontWeight={"500"}
                w={"max-content"}
                border={"1px solid #E6E6E6"}
                bg={"adminWhite"}
                h={"60px"}
              >
                <option value={""}>Categorie</option>
                {data?.categories?.map((cat) =>
                  !cat ? null : (
                    <option
                      key={`${cat.id}${cat.title}`}
                      value={cat.id}
                    >
                      {cat.title}
                    </option>
                  )
                )}
              </Field>
              <IconButton
                aria-label="Zoeken"
                icon={<SearchIcon />}
                type={"submit"}
                isLoading={isSubmitting}
                bg={"primary"}
                color={"white"}
                border={"1px solid #E6E6E6"}
                p={"4"}
                h={"60px"}
                w={"60px"}
                flexShrink={"0"}
              />
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Searchbar;
