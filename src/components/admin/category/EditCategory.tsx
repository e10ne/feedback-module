import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useUpdateCategoryMutation } from "../../../../graphql/generated/graphql";
import { categoryValidation } from "../../../utils/validation";
import InputText from "../../form/InputText";
import DeleteCategoryButton from "./DeleteCategoryButton";

interface EditCategoryProps {
  id: number;
  title: string;
  hasActive: boolean;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  id,
  title,
  hasActive,
}) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const [, updateCategory] = useUpdateCategoryMutation();
  const toast = useToast({
    duration: 3000,
    status: "success",
    isClosable: true,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        color={"adminWhite"}
        bgColor={"primary"}
        _hover={{
          bgColor: "secondary",
        }}
      >
        Bewerken
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title} bewerken</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ id, title }}
            validate={(values) => categoryValidation(values.title)}
            onSubmit={async (values) => {
              if (values.title !== title) {
                const { error } = await updateCategory(values);
                if (!error) {
                  console.log("successfull edit");
                  toast({
                    description: `${title} verandert naar ${values.title}`,
                  });
                }
              }
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <InputText
                    label="Naam Categorie"
                    name="title"
                    autoComplete="off"
                  />
                </ModalBody>
                <ModalFooter justifyContent={"space-between"}>
                  <DeleteCategoryButton
                    hasActiveFeedback={hasActive}
                    id={id}
                    onClose={onClose}
                  />
                  <Flex gap={"4"}>
                    <Button
                      type={"reset"}
                      bgColor={"modalCancel"}
                      color={"white"}
                      onClick={onClose}
                      _hover={{
                        bg: "red.500",
                      }}
                    >
                      Annuleren
                    </Button>
                    <Button
                      type={"submit"}
                      bgColor={"modalConfirm"}
                      isLoading={isSubmitting}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Opslaan
                    </Button>
                  </Flex>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCategory;
