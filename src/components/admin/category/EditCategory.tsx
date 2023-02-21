import {
  Button,
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

interface EditCategoryProps {
  id: number;
  title: string;
}

const EditCategory: React.FC<EditCategoryProps> = ({ id, title }) => {
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
                <ModalFooter>
                  <Button
                    type={"reset"}
                    bgColor={"modalCancel"}
                    onClick={onClose}
                  >
                    Annuleren
                  </Button>
                  <Button
                    type={"submit"}
                    bgColor={"modalConfirm"}
                    isLoading={isSubmitting}
                  >
                    Opslaan
                  </Button>
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
