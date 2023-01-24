import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useCategoriesQuery } from "../../../graphql/generated/graphql";
import { Field, useField } from "formik";
import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
};

const SelectCategory: React.FC<SelectProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  const [{ data, fetching }] = useCategoriesQuery();

  if (!data && !fetching) return <></>;

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        htmlFor={field.name}
        fontSize={"18px"}
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
        {data?.allCategories?.map((cat) =>
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
