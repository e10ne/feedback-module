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
import {
  Feedback,
  useArchiveFeedbackMutation,
} from "../../../../graphql/generated/graphql";
import { FaFileDownload } from "react-icons/fa";
import { useRef } from "react";
import NextLink from "next/link";

interface FeedbackButtonsProps {
  feedback: Feedback;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ feedback }) => {
  const [, archiveFeedback] = useArchiveFeedbackMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <NextLink
        href={`/admin/feedback/${feedback.id}`}
        target="_blank"
      >
        <Button
          variant={"admin"}
          rightIcon={<FaFileDownload />}
        >
          download
        </Button>
      </NextLink>
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
              {`Is de feedback: ${feedback.title} afgerond?`}
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
                  archiveFeedback({ id: feedback.id });
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
