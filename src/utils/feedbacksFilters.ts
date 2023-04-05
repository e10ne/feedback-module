import { FeedbacksQuery } from "../../graphql/generated/graphql";

interface feedbackValues {
  data: FeedbacksQuery | undefined;
  text: string;
  category: string;
}

export function feedbacksFilter(values: feedbackValues): Array<any> {
  if (!values.data || !values.data.feedbacks) {
    return [];
  }

  const oldFeedbacks = values.data.feedbacks;
  let result: Array<any> = [];

  if (!values.text && !values.category) {
    result = oldFeedbacks;
  } else if (values.category && !values.text) {
    result = oldFeedbacks.filter(
      (fb) => fb?.category?.id === parseInt(values.category)
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

  // console.log(result);

  return result;
}
