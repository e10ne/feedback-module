import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FeedbacksQuery } from "../../../../graphql/generated/graphql";
import FeedbackButtons from "./FeedbackButtons";
import { normalFormat } from "../../../utils/formatDate";

interface FeedbackListProps {
  data: FeedbacksQuery | undefined;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ data }) => {
  if (!data?.feedbacks?.length) {
    return <Text>Er zijn geen feedbacks</Text>;
  }
  return (
    <>
      <Accordion
        variant={"active"}
        allowToggle
      >
        {data.feedbacks.map((fb) =>
          !fb ? null : (
            <AccordionItem key={`${fb.create_date}${fb.id}`}>
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
                          color={"secondary"}
                          fontSize={"15px"}
                        >
                          {fb!.category!.title} {" | "}
                          {normalFormat(fb.create_date)}
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

                    <Flex
                      alignSelf={"end"}
                      gap={"4"}
                    >
                      <FeedbackButtons feedback={fb} />
                    </Flex>
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )
        )}
      </Accordion>
    </>
  );
};

export default FeedbackList;
