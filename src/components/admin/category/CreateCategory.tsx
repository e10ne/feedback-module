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
import { TiPlus } from "react-icons/ti";
import { useCreateCategoryMutation } from "../../../../graphql/generated/graphql";
import { categoryValidation } from "../../../utils/validation";
import InputText from "../../form/InputText";

const CreateCategory: React.FC<{}> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, createCategory] = useCreateCategoryMutation();
  const toast = useToast({
    status: "success",
    isClosable: true,
    duration: 3000,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<TiPlus fontSize={"1.2rem"} />}
        variant={"admin"}
      >
        Categorie aanmaken
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Maak nieuwe categorie aan:</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ title: "" }}
            validate={(values) => categoryValidation(values.title)}
            onSubmit={async (values) => {
              console.log("values", values);
              const { error } = await createCategory(values);

              if (!error) {
                console.log("successfully created category");
                toast({ description: `${values.title} is aangemaakt` });
                onClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody>
                  <InputText
                    name="title"
                    label="Naam Categorie"
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

export default CreateCategory;
