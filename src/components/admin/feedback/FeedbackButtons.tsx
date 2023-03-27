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
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FeedbackPDF } from "./FeedbackPDF";

interface FeedbackButtonsProps {
  feedback: Feedback;
  isClient: boolean;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  feedback,
  isClient,
}) => {
  const [, archiveFeedback] = useArchiveFeedbackMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button
        variant={"admin"}
        rightIcon={<FaFileDownload />}
      >
        {isClient && (
          <PDFDownloadLink
            document={<FeedbackPDF feedback={feedback} />}
            fileName={`${feedback.title}.pdf`}
          >
            download
          </PDFDownloadLink>
        )}
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
