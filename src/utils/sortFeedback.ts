import { Feedback } from "../../graphql/generated/graphql";

interface sortFeedbackValues {
  feedbacks: Feedback[];
  sortOption: string;
}

export function sortFeedback(values: sortFeedbackValues): Array<any> {
  if (!values.feedbacks || !values.feedbacks.length) {
    return [];
  }

  let result: any[] = [];

  if (values.sortOption === "") {
    result = values.feedbacks;
  } else if (values.sortOption === "dateNew") {
    result = values.feedbacks.sort((a, b) => {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      return 0;
    });
  } else if (values.sortOption === "dateOld") {
    result = values.feedbacks.sort((a, b) => {
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      return 0;
    });
  } else if (values.sortOption === "nameAsc") {
    result = values.feedbacks.sort((a, b) => {
      if (a.category!.title!.toLowerCase() < b.category!.title!.toLowerCase())
        return -1;
      if (a.category!.title!.toLowerCase() > b.category!.title!.toLowerCase())
        return 1;
      return 0;
    });
  } else if (values.sortOption === "nameDesc") {
    result = values.feedbacks.sort((a, b) => {
      if (a.category!.title!.toLowerCase() > b.category!.title!.toLowerCase())
        return -1;
      if (a.category!.title!.toLowerCase() < b.category!.title!.toLowerCase())
        return 1;
      return 0;
    });
  }

  return result;
}
