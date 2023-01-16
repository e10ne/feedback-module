import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const SelectCategory: React.FC<{}> = () => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"}>Categorie*</FormLabel>
      <Select
        name="category"
        borderColor={"gray.400"}
        _hover={{ borderColor: "gray.600" }}
      >
        <option>Placeholder</option>
        <option>another placeholder</option>
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
