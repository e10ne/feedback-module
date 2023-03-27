import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Feedback } from "../../../../graphql/generated/graphql";

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
  const formattedDate = format(new Date(feedback.create_date!), "PPPP", {
    locale: nl,
  });
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
        <Text style={styles.text}>Datum aangemaakt: {formattedDate}</Text>
        <Text style={styles.text}>Omschijving: {feedback.description}</Text>
      </Page>
    </Document>
  );
};
