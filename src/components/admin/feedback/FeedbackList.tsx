import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Feedback } from "../../../../graphql/generated/graphql";
import format from "date-fns/format";
import FeedbackButtons from "./FeedbackButtons";

interface FeedbackListProps {
  data: Feedback[];
  hasSearched: boolean;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ data, hasSearched }) => {
  if (data.length <= 0 && !hasSearched) {
    return <Text>Er zijn geen feedbacks</Text>;
  } else if (data.length <= 0 && hasSearched) {
    return <Text>Er zijn geen feedbacks die voldoen aan de zoekopdracht</Text>;
  }
  return (
    <>
      <Accordion
        variant={"active"}
        allowToggle
      >
        {data.map((fb) => (
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
                        {format(new Date(fb.create_date), "dd-MM-yyyy")}
                      </Text>
                      <AccordionIcon
                        color={!isExpanded ? "#737373" : "white"}
                        bg={!isExpanded ? "white" : "primary"}
                      />
                    </Flex>
                  </AccordionButton>
                </h5>
                <AccordionPanel>
                  <Text w={"95%"}>{fb.description}</Text>

                  <Flex
                    alignSelf={"end"}
                    gap={"4"}
                  >
                    <FeedbackButtons
                      id={fb.id}
                      title={fb.title!}
                    />
                  </Flex>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default FeedbackList;
