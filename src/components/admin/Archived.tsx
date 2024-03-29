import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useArchivedFeedbacksQuery } from "../../../graphql/generated/graphql";
import { normalFormat } from "../../utils/formatDate";

const Archived: React.FC<{}> = () => {
  const [cursor, setCursor] = useState(null as null | number);
  const [{ data, fetching, error }] = useArchivedFeedbacksQuery({
    variables: { cursor: cursor },
  });

  if (!fetching && !data) {
    return (
      <>
        <Text>Er ging iets niet goed</Text>
        <Text>{error?.message}</Text>
      </>
    );
  }

  return (
    <>
      {!data && fetching ? (
        <Text>Feedbacks ophalen</Text>
      ) : (
        <>
          <Accordion
            variant={"archived"}
            allowToggle
          >
            {data!.archivedFeedbacks?.feedbacks?.map((fb) =>
              !fb ? null : (
                <AccordionItem key={`${fb.id}${fb.title}`}>
                  {({ isExpanded }) => (
                    <>
                      <h5>
                        <AccordionButton>
                          <Text>{fb.title}</Text>

                          <Flex
                            gap={"4"}
                            alignItems={"center"}
                          >
                            <Text
                              color={!isExpanded ? "#FFF" : "secondary"}
                              fontSize={"15px"}
                            >
                              {!fb.category
                                ? "Categorie verwijderd"
                                : fb!.category!.title}{" "}
                              {" | "}
                              {normalFormat(fb.archive_date)}
                            </Text>

                            <AccordionIcon
                              color={!isExpanded ? "#737373" : "white"}
                              bg={!isExpanded ? "white" : "primary"}
                            />
                          </Flex>
                        </AccordionButton>
                      </h5>
                      <AccordionPanel>
                        <Text variant={"description"}>{fb.description}</Text>
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              )
            )}
          </Accordion>
          {data && data.archivedFeedbacks && data.archivedFeedbacks.hasMore ? (
            <Button
              variant={"admin"}
              w={"max-content"}
              alignSelf={"center"}
              rightIcon={<ChevronDownIcon fontSize={"2xl"} />}
              isLoading={fetching}
              onClick={() => {
                setCursor(data!.archivedFeedbacks!.nextCursor as number | null);
              }}
            >
              Laad meer
            </Button>
          ) : null}
        </>
      )}
    </>
  );
};

export default Archived;
