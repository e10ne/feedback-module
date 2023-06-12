import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import { FeedbacksQuery } from "../../../graphql/generated/graphql";
import { CombinedError } from "@urql/core";
import FeedbackList from "./feedback/FeedbackList";
import { sortFeedback } from "../../utils/sortFeedback";
import { Dispatch, SetStateAction, useState } from "react";

interface FeedbacksProps {
  searchResult: any[];
  error: CombinedError | undefined;
  fetching: boolean;
  data: FeedbacksQuery | undefined;
  hasSearched: boolean;
  setSearchResult: Dispatch<SetStateAction<any[]>>;
  setHasSearched: Dispatch<SetStateAction<boolean>>;
}

const Feedbacks: React.FC<FeedbacksProps> = ({
  searchResult,
  error,
  data,
  fetching,
  hasSearched,
  setSearchResult,
  setHasSearched,
}) => {
  const [sortVal, setSortVal] = useState("dateNew");
  let feedbacks = hasSearched ? searchResult : data?.feedbacks!;

  if (error) {
    return (
      <>
        <Text>there is a problem: {error.message}</Text>
      </>
    );
  }

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
          placeholder={"Sorteren op"}
          name={"sortOptions"}
          value={hasSearched ? sortVal : ""}
          onChange={(e) => {
            setSortVal(e.target.value);
            setSearchResult([
              ...sortFeedback({
                feedbacks: feedbacks,
                sortOption: e.target.value,
              }),
            ]);
            setHasSearched(true);
          }}
        >
          <option value={"dateNew"}>Datum: nieuwste eerst</option>
          <option value={"dateOld"}>Datum: oudste eerst</option>
          <option value={"nameAsc"}>Categorie: A &gt; Z</option>
          <option value={"nameDesc"}>Categorie: Z &gt; A</option>
        </Select>
      </Flex>
      {!data && fetching ? (
        <Text>Feedbacks ophalen</Text>
      ) : (
        <FeedbackList data={feedbacks} />
      )}
    </>
  );
};

export default Feedbacks;
