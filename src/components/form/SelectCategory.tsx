import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useCategoriesQuery } from "../../../graphql/generated/graphql";

const SelectCategory: React.FC<{}> = () => {
  const [{ data, fetching }] = useCategoriesQuery();

  if (!data && !fetching) return <></>;

  return (
    <FormControl>
      <FormLabel fontSize={"18px"}>Categorie*</FormLabel>
      <Select
        name="category"
        borderColor={"gray.400"}
        _hover={{ borderColor: "gray.600" }}
        placeholder={fetching ? "laden..." : undefined}
      >
        {data!.allCategories!.map((cat) =>
          !cat ? null : <option value={cat.id}>{cat.title}</option>
        )}
      </Select>
    </FormControl>
  );
};

export default SelectCategory;
