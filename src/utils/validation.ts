export interface feedbackValues {
  title: string;
  category_name: string;
  description: string;
}

export const feedbackValidation = (values: feedbackValues) => {
  const errors: Record<string, string> = {};

  if (values.title.length < 3) {
    errors.title = "Minimaal 3 karakters";
  }

  if (values.category_name === "") {
    errors.category_name = "Kies een categorie";
  }

  if (values.description.length < 10) {
    errors.description = "Minimaal 10 karakters";
  }

  return errors;
};
