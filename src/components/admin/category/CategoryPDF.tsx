import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";
import {
  Category,
  FeedbacksQuery,
} from "../../../../graphql/generated/graphql";
import { feedbacksFilter } from "../../../utils/feedbacksFilters";
import { fullFormat } from "../../../utils/formatDate";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
  },
  text: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
});

interface CategoryPdfProps {
  feedbacks: FeedbacksQuery;
  category: Category;
}

export const CategoryPDF: React.FC<CategoryPdfProps> = ({
  category,
  feedbacks,
}) => {
  const filteredFeedbacks = feedbacksFilter({
    category: category.id.toString(),
    text: "",
    data: feedbacks,
  });
  return (
    <Document title={`Alle feedbacks van ${category.title}`}>
      {filteredFeedbacks.map((fb) => (
        <Page
          key={`${fb.id}${fb.create_date}`}
          style={styles.page}
          size={"A4"}
          bookmark={`${fb.title}`}
        >
          <Text style={styles.text}>Titel: {fb.title}</Text>
          <Text style={styles.text}>Datum: {fullFormat(fb.create_date!)}</Text>
          <Text style={styles.text}>Omschrijving: {fb.description}</Text>
        </Page>
      ))}
    </Document>
  );
};
