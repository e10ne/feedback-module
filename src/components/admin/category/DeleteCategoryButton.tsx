import { IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteCategoryMutation } from "../../../../graphql/generated/graphql";

interface DeleteCategoryButtonProps {
  id: number;
  hasActiveFeedback: boolean;
  onClose: () => void;
}

const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({
  hasActiveFeedback,
  onClose,
  id,
}) => {
  if (hasActiveFeedback) {
    return null;
  }

  const [, deleteCategory] = useDeleteCategoryMutation();

  return (
    <>
      <IconButton
        aria-label="Delete Category"
        variant={"ghost"}
        fontSize={"1.5em"}
        icon={<FaTrashAlt />}
        colorScheme={"red"}
        onClick={() => {
          deleteCategory({
            deleteCategoryId: id,
            hasActive: hasActiveFeedback,
          });
          onClose();
        }}
      />
    </>
  );
};

export default DeleteCategoryButton;
