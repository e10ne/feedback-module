import { useState } from "react";
import { useFeedbacksQuery } from "../../../graphql/generated/graphql";
import { feedbackVars } from "../../pages/admin";
import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import FeedbackList from "./feedback/FeedbackList";

interface FeedbacksProps {
  feedbackVars: feedbackVars;
}

const Feedbacks: React.FC<FeedbacksProps> = ({ feedbackVars }) => {
  const [orderVal, setOrderVal] = useState("dateNew");
  const [{ data, fetching, error }] = useFeedbacksQuery({
    requestPolicy: "cache-and-network",
    variables: {
      categoryId: feedbackVars.categoryId,
      text: feedbackVars.text,
      orderBy: orderVal,
    },
  });

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading variant={"subHeader"}>Feedback</Heading>
        <Select
          variant={"admin"}
          w={"48"}
          onChange={(e) => {
            if (e.target.value !== "") {
              setOrderVal(e.target.value);
            }
          }}
        >
          <option value={orderVal}>Sorteren op</option>
          <option value={"dateNew"}>Datum: nieuwste eerst</option>
          <option value={"dateOld"}>Datum: oudste eerst</option>
          <option value={"nameAsc"}>Categorie: A &gt; Z</option>
          <option value={"nameDesc"}>Categorie: Z &gt; A</option>
        </Select>
      </Flex>
      {error ? (
        <Text>{error.message}</Text>
      ) : !data && !fetching ? (
        <Text>Er zijn geen feedbacks</Text>
      ) : !data && fetching ? (
        <Text>Feedbacks ophalen</Text>
      ) : (
        <>
          <FeedbackList data={data} />
        </>
      )}
    </>
  );
};

export default Feedbacks;
