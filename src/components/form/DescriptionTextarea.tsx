import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import { TextareaHTMLAttributes } from "react";

type DescriptionTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
};

const DescriptionTextarea: React.FC<DescriptionTextareaProps> = ({
  label,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Textarea
        placeholder="Omschrijving"
        resize={"none"}
        id={field.name}
        rows={5}
        borderColor={"gray.400"}
        _hover={{ borderColor: "gray.600" }}
        {...field}
        {...props}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default DescriptionTextarea;
