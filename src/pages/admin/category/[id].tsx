import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../../lib/createUrqlClient";
import { useFeedbacksQuery } from "../../../../graphql/generated/graphql";
import { useIsAuth } from "../../../utils/useIsAuth";
import { useState } from "react";
import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";
import { fullFormat } from "../../../utils/formatDate";
import { getIntId } from "../../../utils/getIntId";

const styles = StyleSheet.create({
  iframe: {
    minHeight: "100vh",
  },
  page: {
    backgroundColor: "#FFF",
  },
  text: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  titleSpan: {
    fontWeight: "extrabold",
    // color: "red",
  },
  dateSpan: {},
});

const CategoryPdf: React.FC<{}> = ({}) => {
  const [isLoading, setIsLoading] = useState(true);
  const intId = getIntId();
  const [{ data, fetching, error }] = useFeedbacksQuery({
    pause: intId === -1 || !intId,
    variables: { categoryId: intId },
  });

  useIsAuth(setIsLoading);

  if (fetching) return <>loading</>;
  if (error) return <>{error.message}</>;
  if (!fetching && (!data?.feedbacks || !data.feedbacks.length)) return <>No</>;

  return (
    <>
      {isLoading ? null : (
        <PDFViewer
          width={"100%"}
          style={styles.iframe}
        >
          <Document>
            {data?.feedbacks?.map((fb) =>
              !fb ? null : (
                <Page
                  key={`${fb.id}${fb.create_date}`}
                  bookmark={`${fb.title}`}
                  size={"A4"}
                  style={styles.page}
                >
                  <Text style={styles.text}>
                    <Text style={styles.titleSpan}>Titel: </Text> {fb.title}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.titleSpan}>datum: </Text>{" "}
                    {fullFormat(fb.create_date)}
                  </Text>
                  <Text style={styles.text}>
                    <Text style={styles.titleSpan}>Omschrijving: </Text>{" "}
                    {fb.description}
                  </Text>
                </Page>
              )
            )}
          </Document>
        </PDFViewer>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(CategoryPdf);
