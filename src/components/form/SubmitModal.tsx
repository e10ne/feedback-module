import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormikErrors } from "formik";
import { CategoriesQuery } from "../../../graphql/generated/graphql";
import { feedbackValues } from "../../utils/validation";

interface SubmitModalProps {
  values: feedbackValues;
  categories: CategoriesQuery | undefined;
  handleSubmit: () => void;
  validateForm: () => Promise<FormikErrors<feedbackValues>>;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  values,
  categories,
  validateForm,
  handleSubmit,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const category = categories?.allCategories?.find((cat) => {
    return cat?.id == parseInt(values.category_id);
  });
  return (
    <>
      <Button
        bgColor={"button"}
        w={"max-content"}
        alignSelf={"flex-end"}
        px={"2em"}
        py={"1.5em"}
        onClick={async () => {
          const validated = await validateForm();
          if (
            !(validated.category_id || validated.description || validated.title)
          )
            onOpen();
        }}
      >
        Verzenden
      </Button>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Zijn de gegevens correct?</ModalHeader>
          <ModalCloseButton />
          <ModalBody my={"6"}>
            <Text>Titel: {values.title}</Text>
            <Text>Categorie: {category?.title}</Text>
            <Text>Omschrijving: {values.description}</Text>
          </ModalBody>
          <ModalFooter justifyContent={"space-around"}>
            <Button onClick={onClose}>Nee</Button>
            <Button
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Ja
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmitModal;
