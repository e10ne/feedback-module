export interface feedbackValues {
  title: string;
  category_id: string;
  description: string;
}

export const feedbackValidation = (values: feedbackValues) => {
  const errors: Record<string, string> = {};

  if (values.title.length < 3) {
    errors.title = "Minimaal 3 karakters";
  }

  if (values.category_id === "") {
    errors.category_id = "Kies een categorie";
  }

  if (values.description.length < 10) {
    errors.description = "Minimaal 10 karakters";
  }

  return errors;
};
