import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import { Feedback } from "../../../../graphql/generated/graphql";
import { fullFormat } from "../../../utils/formatDate";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

interface FeedbackPdfProps {
  feedback: Feedback;
}

export const FeedbackPDF: React.FC<FeedbackPdfProps> = ({ feedback }) => {
  return (
    <Document title={feedback.title!}>
      <Page
        size={"A4"}
        style={styles.page}
      >
        <Text
          style={styles.text}
          fixed={true}
        >
          Titel: <Text style={styles.title}>{feedback.title}</Text>
        </Text>
        <Text style={styles.text}>Categorie: {feedback.category?.title}</Text>
        <Text style={styles.text}>
          Datum aangemaakt: {fullFormat(feedback.create_date!)}
        </Text>
        <Text style={styles.text}>Omschijving: {feedback.description}</Text>
      </Page>
    </Document>
  );
};
