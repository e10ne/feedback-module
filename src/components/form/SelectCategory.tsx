import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { SelectHTMLAttributes } from "react";
import { CategoriesQuery } from "../../../graphql/generated/graphql";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  categories: CategoriesQuery | undefined;
  fetching: boolean;
};

const SelectCategory: React.FC<SelectProps> = ({
  label,
  categories,
  fetching,
  ...props
}) => {
  const [field, { error }] = useField(props);

  if (!categories && !fetching) {
    return <>There are no categories</>;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        htmlFor={field.name}
        fontSize={"18px"}
        fontWeight={"600"}
      >
        {label}
      </FormLabel>
      <Field
        id={field.name}
        as={Select}
        name={field.name}
        borderColor={"gray.400"}
        _hover={{ borderColor: "gray.600" }}
      >
        <option
          value={""}
          disabled
        >
          -- Selecteer een categorie --
        </option>

        {categories?.allCategories?.map((cat) =>
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
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default SelectCategory;
