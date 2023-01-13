import { FormControl, FormLabel, Select } from "@chakra-ui/react";

const SelectCategory: React.FC<{}> = () => {
  return (
    <FormControl>
      <FormLabel fontSize={"18px"}>Categorie*</FormLabel>
      <Select name="category">
        <option>Placeholder</option>
        <option>another placeholder</option>
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
