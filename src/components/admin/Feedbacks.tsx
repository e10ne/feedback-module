import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import { useFeedbacksQuery } from "../../../graphql/generated/graphql";
import { format } from "date-fns";
import FeedbackButtons from "./feedback/FeedbackButtons";

interface FeedbacksProps {}

const Feedbacks: React.FC<FeedbacksProps> = ({}) => {
  const [{ fetching, data, error }] = useFeedbacksQuery();

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
        <Accordion
          allowToggle
          variant={"active"}
        >
          {data?.feedbacks?.map((fb) =>
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
                        {/* <Button
                          variant={"admin"}
                          rightIcon={<FaFileDownload />}
                        >
                          Downloaden
                        </Button>
                        <Button variant={"admin"}>Afronden</Button> */}
                      </Flex>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            )
          )}
        </Accordion>
      )}
    </>
  );
};

export default Feedbacks;
