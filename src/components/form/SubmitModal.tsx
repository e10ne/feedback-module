import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
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
  const category = categories?.categories?.find((cat) => {
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
        size={"3xl"}
      >
        <ModalOverlay />
        <ModalContent
          p={"5"}
          bgColor={"snow"}
          color={"blackAlpha.800"}
        >
          <ModalHeader fontSize={"2xl"}>Zijn de gegevens correct?</ModalHeader>
          <ModalCloseButton />
          <ModalBody my={"6"}>
            <Text fontSize={"xl"}>Titel: {values.title}</Text>
            <Text fontSize={"xl"}>Categorie: {category?.title}</Text>
            <Text fontSize={"xl"}>Omschrijving: {values.description}</Text>
          </ModalBody>
          <ModalFooter justifyContent={"space-around"}>
            <Button
              leftIcon={<AiOutlineClose />}
              borderRadius={"full"}
              px={"14"}
              fontSize={"lg"}
              colorScheme={"blue"}
              onClick={onClose}
            >
              Nee
            </Button>
            <Button
              leftIcon={<AiOutlineCheck />}
              borderRadius={"full"}
              px={"14"}
              fontSize={"lg"}
              colorScheme={"green"}
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
