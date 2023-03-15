import { FeedbacksQuery } from "../../graphql/generated/graphql";

interface feedbackValues {
  feedbacks: FeedbacksQuery | undefined;
  text: string;
  category: string;
}

export function feedbacksFilter(values: feedbackValues): Array<any> {
  if (!values.feedbacks || !values.feedbacks.feedbacks) {
    return [];
  }

  const oldFeedbacks = values.feedbacks.feedbacks;
  let result: Array<any> = [];

  if (!values.text && !values.category) {
    console.log(oldFeedbacks);
    return oldFeedbacks;
  } else if (values.category && !values.text) {
    result = oldFeedbacks.filter(
      (fb) => fb?.category?.id === parseInt(values.category!)
    );
  } else if (values.text && !values.category) {
    result = oldFeedbacks.filter(
      (fb) =>
        fb?.title?.includes(values.text) ||
        fb?.description?.includes(values.text)
    );
  } else {
    result = oldFeedbacks.filter(
      (fb) =>
        (fb?.title?.includes(values.text!) ||
          fb?.description?.includes(values.text!)) &&
        fb.category?.id === parseInt(values.category!)
    );
  }

  console.log(result);

  return result;
}
