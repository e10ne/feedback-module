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
import { feedbackValues } from "../../utils/validation";

interface SubmitModalProps {
  values: feedbackValues;
  handleSubmit: () => void;
  validateForm: () => Promise<FormikErrors<feedbackValues>>;
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  values,
  validateForm,
  handleSubmit,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
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
            !(
              validated.category_name ||
              validated.description ||
              validated.title
            )
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
          <ModalBody>
            <Text>Titel: {values.title}</Text>
            <Text>Categorie: {values.category_name}</Text>
            <Text>Omschrijving: {values.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Nee</Button>
            <Button onClick={handleSubmit}>Ja</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SubmitModal;
