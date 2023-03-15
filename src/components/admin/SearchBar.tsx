import { SearchIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Input, Select } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import {
  CategoriesQuery,
  FeedbacksQuery,
} from "../../../graphql/generated/graphql";
import { feedbacksFilter } from "../../utils/feedbacksFilters";

interface SearchbarProps {
  feedbacks: FeedbacksQuery | undefined;
  categories: CategoriesQuery | undefined;
  setSearchResult: Dispatch<SetStateAction<any[]>>;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
}

const Searchbar: React.FC<SearchbarProps> = ({
  feedbacks,
  categories,
  setSearchResult,
  setHasSearched,
}) => {
  return (
    <>
      <Formik
        initialValues={{
          text: "",
          category: "",
        }}
        onSubmit={async (values) => {
          console.log("values: ", values);

          const result = feedbacksFilter({
            data: feedbacks,
            category: values.category,
            text: values.text,
          });

          setSearchResult(result);
          setHasSearched(true);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex>
              <Field
                as={Input}
                placeholder="Titel en/of omschrijving van feedback"
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
                name="category"
                fontFamily={"Montserrat"}
                fontWeight={"500"}
                w={"max-content"}
                border={"1px solid #E6E6E6"}
                bg={"adminWhite"}
                h={"60px"}
              >
                <option value={""}>Categorie</option>
                {categories?.categories?.map((cat) =>
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
