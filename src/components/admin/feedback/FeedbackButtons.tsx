import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useArchiveFeedbackMutation } from "../../../../graphql/generated/graphql";
import { FaFileDownload } from "react-icons/fa";
import { useRef } from "react";

interface FeedbackButtonsProps {
  id: number;
  title: string;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ id, title }) => {
  const [, archiveFeedback] = useArchiveFeedbackMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button
        variant={"admin"}
        rightIcon={<FaFileDownload />}
      >
        Download
      </Button>
      <Button
        variant={"admin"}
        onClick={onOpen}
      >
        Afronden
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Feedback afronden</AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              {`Is de feedback: ${title} afgerond?`}
            </AlertDialogBody>

            <AlertDialogFooter gap={"10"}>
              <Button
                bg={"modalConfirm"}
                color={"white"}
                ref={cancelRef}
                onClick={onClose}
              >
                Nee
              </Button>
              <Button
                bg={"modalCancel"}
                color={"white"}
                onClick={() => {
                  archiveFeedback({ id });
                  onClose();
                }}
              >
                Ja
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default FeedbackButtons;
