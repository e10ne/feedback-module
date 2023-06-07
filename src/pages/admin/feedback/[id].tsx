import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../../lib/createUrqlClient";
import { useState } from "react";
import { getIntId } from "../../../utils/getIntId";
import { useFeedbackQuery } from "../../../../graphql/generated/graphql";
import { useIsAuth } from "../../../utils/useIsAuth";
import { fullFormat } from "../../../utils/formatDate";

const styles = StyleSheet.create({
  iframe: {
    minHeight: "100vh",
    width: "100%",
  },
  page: {
    backgroundColor: "#FFF",
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

const FeedbackPdf: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const intId = getIntId();
  const [{ fetching, data, error }] = useFeedbackQuery({
    pause: intId === -1 || !intId,
    variables: {
      feedbackId: intId,
    },
  });

  useIsAuth(setIsLoading);

  if (error) return <>{error.message}</>;
  if (fetching) return <>laden...</>;
  if (!fetching && !data?.feedback?.title) return <>Nee</>;

  return (
    <>
      {isLoading ? null : (
        <PDFViewer style={styles.iframe}>
          <Document>
            <Page
              style={styles.page}
              size={"A4"}
            >
              <Text
                style={styles.text}
                fixed={true}
              >
                Titel: {data?.feedback?.title}
              </Text>
              <Text style={styles.text}>
                Categorie: {data?.feedback?.category?.title}
              </Text>
              <Text style={styles.text}>
                Datum: {fullFormat(data?.feedback?.create_date)}
              </Text>
              <Text style={styles.text}>
                Omschrijving: {data?.feedback?.description}
              </Text>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(FeedbackPdf);
