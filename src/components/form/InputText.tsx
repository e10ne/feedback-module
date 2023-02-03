import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  size?: string | undefined;
  label: string;
};

const InputText: React.FC<InputTextProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel
        htmlFor={field.name}
        fontSize={"18px"}
        fontWeight={"600"}
      >
        {label}
      </FormLabel>
      <Input
        {...field}
        {...props}
        _hover={{ borderColor: "gray.600" }}
        id={field.name}
        placeholder={label}
        borderColor={"gray.400"}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputText;
