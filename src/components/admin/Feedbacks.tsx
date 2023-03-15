import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import { FeedbacksQuery } from "../../../graphql/generated/graphql";
import { CombinedError } from "@urql/core";
import FeedbackList from "./feedback/FeedbackList";

interface FeedbacksProps {
  searchResult: any[];
  error: CombinedError | undefined;
  fetching: boolean;
  data: FeedbacksQuery | undefined;
  hasSearched: boolean;
}

const Feedbacks: React.FC<FeedbacksProps> = ({
  searchResult,
  error,
  data,
  fetching,
  hasSearched,
}) => {
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
        <FeedbackList
          hasSearched={hasSearched}
          data={hasSearched ? searchResult : data?.feedbacks!}
        />
      )}
    </>
  );
};

export default Feedbacks;
